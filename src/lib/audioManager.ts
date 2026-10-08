// ============================================================================
// GESTÃO GLOBAL CENTRALIZADA DE INSTÂNCIA ÚNICA DE ÁUDIO & CONTROLE DE SCROLL
// Ateliê Fernanda Garroni — Sistema de Áudio Inteligente
// ============================================================================

let globalActiveMediaElement: HTMLMediaElement | null = null;
let globalPlaybackDebounceTimer: NodeJS.Timeout | null = null;

/**
 * Pausa imediatamente qualquer áudio/vídeo anteriormente ativo e reinicia o tempo
 * para que nunca haja dois sons tocando simultaneamente em nenhuma seção do site.
 */
export function stopAllPreviousAudio(except?: HTMLMediaElement | null) {
  if (globalActiveMediaElement && globalActiveMediaElement !== except) {
    try {
      globalActiveMediaElement.pause();
      globalActiveMediaElement.currentTime = 0;
      globalActiveMediaElement.muted = true;
    } catch {
      // safe fallback
    }
  }

  if (typeof document !== "undefined") {
    // Silencia e pausa todos os elementos de vídeo que não sejam o atual
    const allVideos = document.querySelectorAll<HTMLVideoElement>("video");
    allVideos.forEach((v) => {
      if (v !== except && (!v.paused || !v.muted)) {
        try {
          v.pause();
          v.muted = true;
        } catch {
          // safe fallback
        }
      }
    });

    // Silencia qualquer elemento de áudio
    const allAudios = document.querySelectorAll<HTMLAudioElement>("audio");
    allAudios.forEach((a) => {
      if (a !== except && !a.paused) {
        try {
          a.pause();
          a.currentTime = 0;
          a.muted = true;
        } catch {
          // safe fallback
        }
      }
    });
  }

  globalActiveMediaElement = except || null;
}

/**
 * Ativa diretamente o som e reproduz a mídia em resposta a um gesto direto do usuário,
 * garantindo desbloqueio sem restrições de autoplay do navegador e volume ativo (muted = false).
 */
export function unlockAndPlayDirect(
  media: HTMLMediaElement,
  withSound: boolean = true
) {
  if (globalPlaybackDebounceTimer) {
    clearTimeout(globalPlaybackDebounceTimer);
    globalPlaybackDebounceTimer = null;
  }

  if (withSound) {
    stopAllPreviousAudio(media);
    media.muted = false;
    media.volume = 1.0;
    globalActiveMediaElement = media;
  } else {
    media.muted = true;
  }

  try {
    const playPromise = media.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (withSound) {
            media.muted = false;
            media.volume = 1.0;
            globalActiveMediaElement = media;
          }
        })
        .catch((err) => {
          // Se o navegador ainda restringir com som, faz fallback suave para mudo
          if (withSound) {
            console.warn("Autoplay bloqueado com som pelo navegador, aplicando fallback:", err);
            media.muted = true;
            media.play().catch(() => {});
          }
        });
    }
  } catch (e) {
    console.warn("Erro ao iniciar mídia:", e);
  }
}

/**
 * Registra o elemento ativo no gerenciador global
 */
export function registerActiveMedia(media: HTMLMediaElement | null) {
  if (media && media !== globalActiveMediaElement) {
    stopAllPreviousAudio(media);
  }
  globalActiveMediaElement = media;
}

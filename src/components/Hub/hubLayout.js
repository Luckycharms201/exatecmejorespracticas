/**
 * Geometría del hub-constelación.
 * Los nodos-grupo orbitan un núcleo central; estas posiciones (en %)
 * las usan tanto el render del Hub como el origen del zoom de cámara,
 * para que la cámara escale exactamente hacia el nodo que se entra.
 */
export const HUB_RADIUS = 30; // % de distancia desde el centro

export function nodePosition(angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: 50 + HUB_RADIUS * Math.cos(rad),
    y: 50 + HUB_RADIUS * Math.sin(rad),
  };
}

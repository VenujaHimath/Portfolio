/** Normalized pointer position (-1 to 1) for robot head tracking */
export const robotMouse = { x: 0, y: 0 };

export function setRobotMouseFromEvent(clientX: number, clientY: number) {
  robotMouse.x = (clientX / window.innerWidth) * 2 - 1;
  robotMouse.y = -((clientY / window.innerHeight) * 2 - 1);
}

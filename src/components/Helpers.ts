import { Vector } from "matter-js";

export function turnToFace(from: Vector, to: Vector, currentAngle: number, maxAngle: number) {
    const diffVector = Vector.sub(to, from);

    var desiredRotation = Math.atan2(diffVector.y, diffVector.x);

    var diff = wrapAngle(desiredRotation - currentAngle);

    diff = clamp(diff, -maxAngle, maxAngle);

    return currentAngle + diff;
}

export function wrapAngle(angle: number) {
    while (angle < -Math.PI) {
        angle += (Math.PI * 2);
    }

    while (angle > Math.PI) {
        angle -= (Math.PI * 2);
    }

    return angle;
}

export function clamp(number: number, min: number, max: number) {
    if (number > max) {
        return max;
    }

    if (number < min) {
        return min;
    }

    return number;
}
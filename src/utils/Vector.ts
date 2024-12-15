export class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    // Add another vector
    add(v: Vector2): Vector2 {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    // Subtract another vector
    subtract(v: Vector2): Vector2 {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    // Scale (multiply) the vector by a scalar
    scale(scalar: number): Vector2 {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    // Calculate the magnitude (length) of the vector
    magnitude(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    // Normalize the vector (convert to unit length)
    normalize(): Vector2 {
        const mag = this.magnitude();
        return mag === 0 ? new Vector2(0, 0) : this.scale(1 / mag);
    }

    // Dot product with another vector
    dot(v: Vector2): number {
        return this.x * v.x + this.y * v.y;
    }

    // Angle between this vector and another vector (in radians)
    angleTo(v: Vector2): number {
        const dot = this.dot(v);
        const magProduct = this.magnitude() * v.magnitude();
        return Math.acos(Math.max(-1, Math.min(1, dot / magProduct))); // Clamp to avoid floating-point errors
    }

    // Rotate the vector by an angle (in radians)
    rotate(angle: number): Vector2 {
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        return new Vector2(
            this.x * cosA - this.y * sinA,
            this.x * sinA + this.y * cosA
        );
    }

    // Set this vector to point toward a target position
    static fromAngle(angle: number): Vector2 {
        return new Vector2(Math.cos(angle), Math.sin(angle));
    }

    // Get the angle (in radians) of this vector
    getAngle(): number {
        return Math.atan2(this.y, this.x);
    }

    // Static method for distance between two vectors
    static distance(a: Vector2, b: Vector2): number {
        return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
    }
}


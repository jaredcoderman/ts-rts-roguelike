export class SpriteLoader {
    private sprites: Map<string, HTMLImageElement> = new Map();

    public async loadSprite(url: string): Promise<HTMLImageElement> {
        if (this.sprites.has(url)) {
            return this.sprites.get(url)!; // Return cached sprite
        }

        const img = new Image();
        img.src = url;

        return new Promise((resolve, reject) => {
            img.onload = () => {
                this.sprites.set(url, img); // Cache the loaded sprite
                resolve(img);
            };

            img.onerror = () => reject(new Error(`Failed to load sprite: ${url}`));
        });
    }

   public async loadSprites(urls: string[]): Promise<void> {
        await Promise.all(urls.map(url => this.loadSprite(url)));
    }

   public getSprite(url: string): HTMLImageElement | undefined {
        return this.sprites.get(url);
    }
}


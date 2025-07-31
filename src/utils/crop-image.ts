interface CroppedImageResult {
	file: Blob;
	url: string;
}

export const readFile = (file: File): Promise<string | ArrayBuffer | null> => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => resolve(reader.result), false);
		reader.readAsDataURL(file);
	});
};

export const createImage = (url: string): Promise<HTMLImageElement> => {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', (error) => reject(error));
		image.setAttribute('crossOrigin', 'anonymous');
		image.src = url;
	});
};

export function getRadianAngle(degreeValue: number): number {
	return (degreeValue * Math.PI) / 180;
}

export function rotateSize(width: number, height: number, rotation: number): { width: number; height: number } {
	const rotRad = getRadianAngle(rotation);

	return {
		width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
		height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
	};
}

export const getCroppedImg = async (
	imageSrc: string,
	pixelCrop = { x: 0, y: 0, width: 0, height: 0 },
	rotation = 0,
	flip = { horizontal: false, vertical: false },
): Promise<CroppedImageResult> => {
	const image = await createImage(imageSrc);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	if (!ctx) {
		throw new Error('Failed to get 2D context');
	}

	const rotRad = getRadianAngle(rotation);

	// Calculate bounding box of the rotated image
	const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation);

	// Set canvas size to match the bounding box
	canvas.width = bBoxWidth;
	canvas.height = bBoxHeight;

	// Translate canvas context to a central location to allow rotating and flipping around the center
	ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
	ctx.rotate(rotRad);
	ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
	ctx.translate(-image.width / 2, -image.height / 2);

	// Draw rotated image
	ctx.drawImage(image, 0, 0);

	// Calculate the cropping area after rotation
	const data = ctx.getImageData(
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
	);

	// Resize canvas to desired crop size
	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;

	// Place cropped data back onto the canvas
	ctx.putImageData(data, 0, 0);

	// As a blob
	return new Promise((resolve) => {
		canvas.toBlob((blob) => {
			if (blob) {
				const file = new File([blob], `cropped-image-${Date.now()}.jpeg`, { type: 'image/jpeg', lastModified: Date.now() });
				const url = URL.createObjectURL(file);
				resolve({ file, url });
			} else {
				throw new Error('Failed to create Blob');
			}
		}, 'image/jpeg');
	});
};

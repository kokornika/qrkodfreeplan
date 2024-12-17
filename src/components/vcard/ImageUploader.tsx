import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Cropper from 'react-easy-crop';
import * as Dialog from '@radix-ui/react-dialog';
import { ImagePlus, X, Check, ZoomIn, Edit2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Slider } from '../ui/Slider';

interface ImageUploaderProps {
  value?: string;
  onChange: (value: string) => void;
}

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setIsDialogOpen(true);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleEdit = () => {
    if (value) {
      setImage(value);
      setIsDialogOpen(true);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxSize: 5242880, // 5MB
    multiple: false
  });

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: CropArea) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', error => reject(error));
      image.src = url;
    });

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: CropArea,
  ): Promise<string> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return canvas.toDataURL('image/jpeg');
  };

  const handleSave = async () => {
    if (image && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(image, croppedAreaPixels);
        onChange(croppedImage);
        setIsDialogOpen(false);
        setImage(null);
        setZoom(1);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`relative w-full rounded-lg border transition-colors cursor-pointer
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} 
          ${value ? 'bg-gray-50' : 'bg-white'} group
          h-20 sm:h-32`}
      >
        <input {...getInputProps()} />
        {value ? (
          <>
            <img
              src={value}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-lg object-center"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit();
                }}
                className="bg-white/90 hover:bg-white p-2 rounded-full transition-all transform hover:scale-110"
              >
                <Edit2 className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Mobile View */}
            <div className="block sm:hidden">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm">
                Kép feltöltése
              </button>
            </div>
            {/* Desktop View */}
            <div className="hidden sm:flex flex-col items-center">
              <ImagePlus className="w-12 h-12 text-gray-400 mb-2" />
              <div className="text-sm text-center text-gray-600">
                {isDragActive ? (
                  <p>Dobd ide a képet...</p>
                ) : (
                  <>
                    <p className="font-medium">Kattints vagy húzd ide a képet</p>
                    <p className="text-gray-400">PNG, JPG (max. 5MB)</p>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <Dialog.Title className="text-xl font-semibold">
                Kép szerkesztése
              </Dialog.Title>
              <Dialog.Close className="text-gray-400 hover:text-gray-500">
                <X className="w-5 h-5" />
              </Dialog.Close>
            </div>

            <div className="relative w-full aspect-square mb-6" style={{ height: '400px' }}>
              {image && (
                <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  minZoom={1}
                  maxZoom={3}
                  cropShape="round"
                  showGrid={true}
                  zoomSpeed={0.1}
                  restrictPosition={true}
                />
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <ZoomIn className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Nagyítás</span>
              </div>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.01}
                onChange={(value) => setZoom(value)}
              />
            </div>

            <div className="flex justify-end gap-3 sticky bottom-0 bg-white pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false);
                  setZoom(1);
                }}
              >
                Mégse
              </Button>
              <Button onClick={handleSave}>
                <Check className="w-4 h-4 mr-2" />
                Mentés
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default ImageUploader;
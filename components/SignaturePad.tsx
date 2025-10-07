
import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { SignaturePadRef } from '../types';

interface SignaturePadProps {
    onEnd: (dataUrl: string) => void;
}

export const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>((props, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawing = useRef(false);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const context = canvas.getContext('2d');
        if (!context) return;
        contextRef.current = context;
        
        const resizeCanvas = () => {
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            context.scale(ratio, ratio);
            context.strokeStyle = "#222222";
            context.lineWidth = 2;
            context.lineCap = "round";
            context.lineJoin = "round";
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const getCoords = (event: MouseEvent | TouchEvent): { x: number; y: number } => {
            const rect = canvas.getBoundingClientRect();
            if (event instanceof MouseEvent) {
                return { x: event.clientX - rect.left, y: event.clientY - rect.top };
            }
            return { x: event.touches[0].clientX - rect.left, y: event.touches[0].clientY - rect.top };
        };

        const startDrawing = (event: MouseEvent | TouchEvent) => {
            event.preventDefault();
            const { x, y } = getCoords(event);
            context.beginPath();
            context.moveTo(x, y);
            isDrawing.current = true;
        };

        const draw = (event: MouseEvent | TouchEvent) => {
            if (!isDrawing.current) return;
            event.preventDefault();
            const { x, y } = getCoords(event);
            context.lineTo(x, y);
            context.stroke();
        };

        const stopDrawing = () => {
            if (!isDrawing.current) return;
            isDrawing.current = false;
            context.closePath();
            if (canvasRef.current) {
                props.onEnd(canvasRef.current.toDataURL('image/png'));
            }
        };

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseleave', stopDrawing);

        canvas.addEventListener('touchstart', startDrawing, { passive: false });
        canvas.addEventListener('touchmove', draw, { passive: false });
        canvas.addEventListener('touchend', stopDrawing);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDrawing);
            canvas.removeEventListener('mouseleave', stopDrawing);
            canvas.removeEventListener('touchstart', startDrawing);
            canvas.removeEventListener('touchmove', draw);
            canvas.removeEventListener('touchend', stopDrawing);
        };
    }, [props.onEnd]);

    useImperativeHandle(ref, () => ({
        clear: () => {
            const canvas = canvasRef.current;
            const context = contextRef.current;
            if (canvas && context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        },
        getSignature: () => {
            const canvas = canvasRef.current;
            if (!canvas) return undefined;
            // Check if canvas is blank
            const context = contextRef.current;
            if (!context) return undefined;
            const pixelBuffer = new Uint32Array(
                context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
            );
            const isBlank = !pixelBuffer.some(color => color !== 0);
            return isBlank ? undefined : canvas.toDataURL('image/png');
        }
    }));

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-48 bg-white cursor-crosshair"
        />
    );
});

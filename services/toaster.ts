import { toast } from 'react-hot-toast';

export function useToast(DURATION = 3000) {
    const config = {
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
            padding: '16px',
        },
        duration: DURATION,
    };
    const onSuccess = (message: string, duration?: number) =>
        toast.success(message, { ...config, duration: duration || DURATION });
    const onError = (message: string, duration?: number) =>
        toast.error(message, { ...config, duration: duration || DURATION });

    return { onSuccess, onError };
}

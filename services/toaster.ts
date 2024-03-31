import { toast } from 'react-hot-toast';

export function useToast(duration = 3000) {
    const config = {
        style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
        },
        duration,
    };
    const onSuccess = (message: string) => toast.success(message, config);
    const onError = (message: string) => toast.error(message, config);

    return { onSuccess, onError };
}

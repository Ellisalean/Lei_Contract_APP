
export interface ServicePlan {
    id: string;
    name: string;
    price: string;
    description: string;
    details: string[];
    rider: string;
}

export interface SignaturePadRef {
    clear: () => void;
    getSignature: () => string | undefined;
}

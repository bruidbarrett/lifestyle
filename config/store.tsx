import create from "zustand";

type Store = {
    data: any;
    setData: (data: any) => void;
    imageData: string;
    setImageData: (imageData: string) => void;
};

export const useStore = create<Store>((set) => ({
    data: { 
        responseJson: {
            co2: "loading...",
            fanStatus: "loading...",
            heaterStatus: "loading...",
            humidity: "loading...",
            temp: "loading...",
            time: "loading...",
            _id: "loading...", 
        },
    },
    setData: (data) => set({ data }),
    imageData: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/A_black_image.jpg/640px-A_black_image.jpg",
    setImageData: (imageData) => set({ imageData }),
}));
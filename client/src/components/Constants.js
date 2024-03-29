import logoBun from "../assets/logoBun.webp";
import macarons from "../assets/macarons.jpg";
import painAuChocolat from "../assets/painAuChocolat.jpg";
import tartaFructe from "../assets/tartaFructe.jpg";
import background7 from "../assets/background7.jpg";
import briosa from "../assets/briosa.jpg";
import cinnamonRolls from "../assets/cinnamonRolls.jpg";
import croissant from "../assets/Croissant.jpg";

export const CONSTANTS = {
    IMAGES: {
        logo: logoBun,
        macarons: macarons,
        painAuChocolat: painAuChocolat,
        tartaFructe: tartaFructe,
        background: background7,
        briosa: briosa,
        cinnamonRolls: cinnamonRolls,
        croissant: croissant,
    },
    RESPONSIVE: {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    },
};

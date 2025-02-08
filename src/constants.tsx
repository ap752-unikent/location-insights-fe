import { FaTrain, FaTree } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { HiMiniUserGroup } from "react-icons/hi2";
import { MdOutlineNightlife } from "react-icons/md";

export type Question = {
    id: string,
    question: string,
    options: {
        value: number,
        label: string
    }[];
};

export const QUESTION_IDS = {
    parksAndNature: "parksAndNature",
    transportLinksDaytime: "transportLinksDaytime",
    transportLinksNighttime: "transportLinksNighttime",
    nightlife: "nightlife",
    convenienceStores: "convenienceStores",
    safety: "safety"
}

export const questions : Question[] = [
    {
        id: QUESTION_IDS.parksAndNature,
        question: "How often do you expect to visit parks, green spaces, or natural areas in your neighbourhood?",
        options: [
            {
                value: 4,
                label: "Daily"
            },
            {
                value: 3,
                label: "Every other day"
            },
            {
                value: 2,
                label: "Weekly"
            },
            {
                value: 1,
                label: "Monthly"
            },
            {
                value: 0,
                label: "Less than once a month"
            }
        ]
    },
    {
        id: QUESTION_IDS.transportLinksDaytime,
        question: "How often do you expect to use public transport to commute to work, school, or other regular obligations?",
        options: [
            {
                value: 4,
                label: "Daily"
            },
            {
                value: 3,
                label: "Every other day"
            },
            {
                value: 2,
                label: "Twice a week"
            },
            {
                value: 1,
                label: "Weekly"
            },
            {
                value: 0,
                label: "Monthly"
            }
        ]
    },
    {
        id: QUESTION_IDS.transportLinksNighttime,
        question: "How often will you need to commute back home from a night out or evening activity?",
        options: [
            {
                value: 4,
                label: "Twice a week or more"
            },
            {
                value: 3,
                label: "Weekly"
            },
            {
                value: 2,
                label: "Every other week"
            },
            {
                value: 1,
                label: "Monthly"
            },
            {
                value: 0,
                label: "Less than once a month"
            }
        ]
    },
    {
        id: QUESTION_IDS.nightlife,
        question: "How often do you plan to go out to bars, clubs, restaurants, or other evening entertainment near your neighborhood?",
        options: [
            {
                value: 4,
                label: "Twice a week or more"
            },
            {
                value: 3,
                label: "Weekly"
            },
            {
                value: 2,
                label: "Every other week"
            },
            {
                value: 1,
                label: "Monthly"
            },
            {
                value: 0,
                label: "Less than once a month"
            }
        ],
    }, 
    {
        id: QUESTION_IDS.convenienceStores,
        question: "How important is it to have convenient amenities like stores, gyms, and GP practices within walking distance?",
        options: [
            {
                value: 4,
                label: "Essential"
            },
            {
                value: 3,
                label: "Important"
            },
            {
                value: 2,
                label: "Neutral"
            },
            {
                value: 1,
                label: "Not important"
            },
            {
                value: 0,
                label: "Irrelevant"
            }
        ]
    }, 
    {
        id: QUESTION_IDS.safety,
        question: "How much does a low crime rate influence your choice of location",
        options: [
            {
                value: 4,
                label: "Essential"
            },
            {
                value: 3,
                label: "Important"
            },
            {
                value: 2,
                label: "Neutral"
            },
            {
                value: 1,
                label: "Not important"
            },
            {
                value: 0,
                label: "Irrelevant"
            }
        ]
    }
]

export type VoteCategory = {
    id: string,
    name: string,
    icon: JSX.Element,
    votes?: number
}

export const VOTE_IDS = {
    parksAndNature: "parksAndNature",
    transportLinks: "transportLinks",
    nightlife: "nightlife",
    convenienceStores: "convenienceStores",
    safety: "safety"
}

export const categories : VoteCategory[] = [
    {
        id: VOTE_IDS.parksAndNature,
        name: "Parks and nature",
        icon: <FaTree
            color="gray"
        />
    },
    {
        id: VOTE_IDS.transportLinks,
        name: "Transport links",
        icon: <FaTrain
            color="gray"
        />
    },
    {
        id: VOTE_IDS.nightlife,
        name: "Nightlife",
        icon: <MdOutlineNightlife
            color="gray"
            size={20}
        />
    },
    {
        id: VOTE_IDS.convenienceStores,
        name: "Convenience",
        icon: <FaBasketShopping
            color="gray"
            size={18}
        />
    },
    {
        id: VOTE_IDS.safety,
        name: "Safety",
        icon: <HiMiniUserGroup
            color="gray"
            size={20}
        />
    }
]

export const STRING_IDS = ["heroText", "mainDescription", "tab1", "tab2", "returnToResults", "centerMarker", "northMarker", "eastMarker", "southMarker", "westMarker", "pointsAnalysed", "externalLinkText", "averageMonthlyRentText", "compatibilityScoreText", "budgetPerMonth", "localAmenities", "graphTotalCrime", "graphCrimeFootfall", "nightlifeText", "parksAndNatureText", "extraStationCount", "commuteTimeText", "commuteTimeNightText", "centralLondonCitation", "votesRemaining"];

export const TOTAL_VOTES = 6;
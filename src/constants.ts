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
        question: "How often do you expect to visit parks, green spaces, or natural areas nearby?",
        options: [
            {
                value: 5,
                label: "Daily"
            },
            {
                value: 4,
                label: "Every other day"
            },
            {
                value: 3,
                label: "Weekly"
            },
            {
                value: 2,
                label: "Monthly"
            },
            {
                value: 1,
                label: "Less than once a month"
            }
        ]
    },
    {
        id: QUESTION_IDS.transportLinksDaytime,
        question: "How often do you expect to use public transport to commute to work, school, or other regular obligations?",
        options: [
            {
                value: 5,
                label: "Daily"
            },
            {
                value: 4,
                label: "Every other day"
            },
            {
                value: 3,
                label: "Twice a week"
            },
            {
                value: 2,
                label: "Weekly"
            },
            {
                value: 1,
                label: "Monthly"
            }
        ]
    },
    {
        id: QUESTION_IDS.transportLinksNighttime,
        question: "How often will you need to commute back home from a night out or evening activity?",
        options: [
            {
                value: 5,
                label: "Twice a week or more"
            },
            {
                value: 4,
                label: "Weekly"
            },
            {
                value: 3,
                label: "Every other week"
            },
            {
                value: 2,
                label: "Monthly"
            },
            {
                value: 1,
                label: "Less than once a month"
            }
        ]
    },
    {
        id: QUESTION_IDS.nightlife,
        question: "How often do you plan to go out to bars, clubs, restaurants, or other evening entertainment near your neighborhood?",
        options: [
            {
                value: 5,
                label: "Twice a week or more"
            },
            {
                value: 4,
                label: "Weekly"
            },
            {
                value: 3,
                label: "Every other week"
            },
            {
                value: 2,
                label: "Monthly"
            },
            {
                value: 1,
                label: "Less than once a month"
            }
        ],
    }, 
    {
        id: QUESTION_IDS.convenienceStores,
        question: "How important is having convenience stores within a short walking distance to you",
        options: [
            {
                value: 5,
                label: "Essential"
            },
            {
                value: 4,
                label: "Important"
            },
            {
                value: 3,
                label: "Neutral"
            },
            {
                value: 2,
                label: "Not important"
            },
            {
                value: 1,
                label: "Irrelevant"
            }
        ]
    }, 
    {
        id: QUESTION_IDS.safety,
        question: "How much does a low crime rate influence your choice of location",
        options: [
            {
                value: 5,
                label: "Essential"
            },
            {
                value: 4,
                label: "Important"
            },
            {
                value: 3,
                label: "Neutral"
            },
            {
                value: 2,
                label: "Not important"
            },
            {
                value: 1,
                label: "Irrelevant"
            }
        ]
    }
]
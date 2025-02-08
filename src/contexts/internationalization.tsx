import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { STRING_IDS } from "../constants";
import { useLocaleStrings } from "../hooks/use-locale-strings";
import { Text, TextProps } from "@chakra-ui/react";
import Markdown from "react-markdown";
import re from "rehype-raw";

export type LocaleState = {
    localeStrings: Record<string, string>;
}

type LocaleStateContextValue = {
    state: LocaleState;
}

const LocaleStateContext = createContext<LocaleStateContextValue | undefined>(undefined);

type LocaleStateProviderProps = {
    children: React.ReactNode;
}

export const LocaleStateProvider: React.FC<LocaleStateProviderProps> = ({ children }) => {

    const languageCode = navigator.language.split("-")[0];
    const { localeData } = useLocaleStrings({ languageCode });

    return (
        <LocaleStateContext.Provider value={{ state: { localeStrings: localeData ?? {} } }}>
            {children}
        </LocaleStateContext.Provider>
    );
};

export const useLocaleContext = () => {
    const context = useContext(LocaleStateContext);
    if (!context) {
        throw new Error('useLocaleContext must be used within a LocaleStateProvider');
    }
    return context;
}

type Props = {
    id: string;
    replacements?: Record<string, string> | undefined;
}

const useReplacedString = (localeString: string, replacements: Record<string, string> | undefined) => {
    const replacedString = useMemo(() => {
        if(!replacements || !localeString) return localeString;

        const replacedString = Object.entries(replacements).reduce((acc, [key, value]) => { 
            return acc.replace(`<${key}>`, ` ${value}`);
        }, localeString);

        return replacedString;
    }, [replacements, localeString]);

    return replacedString;
}

export const useLocaleString = ({id, replacements} : Props) => {
    const { state: { localeStrings } } = useLocaleContext();
    const localeString = localeStrings[id];

    const replacedString = useReplacedString(localeString, replacements);

    return replacedString;
}

export const LocaleText = ({ id, replacements, ...props }: Props & TextProps) => {
    const { state: { localeStrings } } = useLocaleContext();
    const localeString = localeStrings[id];
    const replacedString = useReplacedString(localeString, replacements);
    const postFormattedExceptionsString = replacedString && replacedString.replace(/\+/g, "&plus;")

    return (
        <Text
            {...props}
        >
            <Markdown
                rehypePlugins={[re]}
            >
                {postFormattedExceptionsString}
            </Markdown>
        </Text>
    )
}
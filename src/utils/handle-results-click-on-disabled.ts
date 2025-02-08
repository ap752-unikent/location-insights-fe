import { toaster } from "../components/ui/toaster";

type Props = {
    votesRemainingText: string;
}

export const handleResultsTabClickOnDisabled = ({
    votesRemainingText
} : Props) => {

    toaster.create({
        title: votesRemainingText,
        type: "warning"
    });
    // @ts-ignore
    window.sa_event('results_action_clicked_disabled');
}
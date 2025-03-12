import FailedToFetch from "./svg-files/FailedToFetch";
import NoMatches from "./svg-files/NoMatches";
import NoUsersYet from "./svg-files/NoUsersYet";
import Spinner from "./svg-files/Spinner";

export default function LoadingShade({
    spinner,
    noUsersYet,
    failToFetch,
    noMatches
}) {
    return (

        <div className="loading-shade">
            {spinner && <Spinner />}

            {!spinner && !failToFetch && !noMatches && noUsersYet && <NoUsersYet />}

            {failToFetch && <FailedToFetch />}

            {noMatches && <NoMatches />}

        </div>
    );
}
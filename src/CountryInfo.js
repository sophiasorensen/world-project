import * as React from "react";
import { useCallback } from "react";
import { useQuery } from "@apollo/client";
import { queryCountry } from "./queries";
import { Dialog, DialogBody } from "@blueprintjs/core";

export default function CountryInfo({ currentCountryCode, setCurrentCountryCode }) {
    const variables = { filter: currentCountryCode ? { code: { eq: currentCountryCode } } : { } };
    const { data, loading, error } = useQuery(queryCountry, { variables });
    const handleClose = () => setCurrentCountryCode("")

    return <Dialog isOpen={currentCountryCode} onClose={ handleClose }>
        <DialogBody>
            <p>Test dialog</p>
        </DialogBody>
    </Dialog>
}
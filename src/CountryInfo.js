import * as React from "react";
import { useCallback } from "react";
import { useQuery } from "@apollo/client";
import { queryCountry } from "./queries";
import { Dialog, DialogBody } from "@blueprintjs/core";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

export default function CountryInfo({ dialogOpen, setDialogOpen, currentCountryCode }) {
    const variables = { code: currentCountryCode };
    const { data, loading, error } = useQuery(queryCountry, { variables });
    const handleClose = () => setDialogOpen(false)

    console.log("current country: " + currentCountryCode)

    if (error) {
        return (
            <Dialog isOpen={ dialogOpen } onClose={ handleClose }>
                <DialogBody>
                    <ErrorPage error={ error }/>
                </DialogBody>
            </Dialog>
        );
    }

    if (data) console.log("data: " + data.country.name)

    return <Dialog isOpen={ dialogOpen } onClose={ handleClose }>
        <DialogBody>
            { loading ? <LoadingPage/> : data && <p>{ data.country.name }</p> }
        </DialogBody>
    </Dialog>
}
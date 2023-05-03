import ErrorWithStatusCode from "../classes/ErrorWithStatusCode";
import { participant as ParticipantType } from "../../types/participant";

export function ValidateName(name: string): boolean {
    if (!name) {
        throw new ErrorWithStatusCode("Name is required", 400);
    } else if (!name.match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/)) {
        throw new ErrorWithStatusCode(
            "Invalid Name: name must not contain special characters or digits.",
            400
        );
    }
    return true;
}
export function ValidateCollegeId(collegeId: string): boolean {
    if (!collegeId) {
        throw new ErrorWithStatusCode("College ID is required", 400);
    } else if (!collegeId.match(/^\d{2}[a-zA-Z0-9]?\d{4}$/)) {
        throw new ErrorWithStatusCode(
            "Invalid College ID: College ID must be 7 digits long with a number or letter in the 3rd digit",
            400
        );
    }
    return true;
}
export function ValidatePhone(phoneNumber: string): boolean {
    if (!phoneNumber) {
        throw new ErrorWithStatusCode("Phone number is required", 400);
    } else if (!phoneNumber.match(/^01\d{9}$/)) {
        throw new ErrorWithStatusCode(
            "Invalid Phone number: Phone number must be 11 digits long and start with 01",
            400
        );
    }
    return true;
}
export function ValidateEmail(email: string): boolean {
    if (!email) {
        throw new ErrorWithStatusCode("Email is required", 400);
    }
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        throw new ErrorWithStatusCode(
            "Invalid Email: Email must be in the form of  person@mailServer.oneormore",
            400
        );
    }
    return true;
}
export function ValidateYear(year: string): boolean {
    if (!year) {
        throw new ErrorWithStatusCode("Year is required", 400);
    } else if (!year.match(/^(Freshman|Sophomore|Junior|Senior 1|Senior 2)$/)) {
        throw new ErrorWithStatusCode(
            "Invalid Year: Year must be one of Freshman, Sophomore, Junior, Senior 1, Senior 2",
            400
        );
    }
    return true;
}
export function ValidatePreference(preference: string, order: string): boolean {
    if (!preference) {
        throw new ErrorWithStatusCode(`${order} Preference is required`, 400);
    } else if (!preference.match(/^(webDev1|webDev2|webDev3)$/)) {
        throw new ErrorWithStatusCode(
            `Invalid ${order} Preference: Preference must be one of webDev1, webDev2 or webDev3`,
            400
        );
    }
    return true;
}

export function ValidateParticipant(participant: ParticipantType): boolean {
    if (!participant) {
        throw new ErrorWithStatusCode("Participant is required", 400);
    }
    if(participant.firstPreference === participant.secondPreference) {
        throw new ErrorWithStatusCode("Preferences must be different", 400);
    }
    if(!participant.firstPrefReason) {
        throw new ErrorWithStatusCode("First Preference Reason is required", 400);
    }
    if(!participant.firstPrefKnowledge) {
        throw new ErrorWithStatusCode("First Preference Knowledge is required", 400);
    }
    if(!participant.secondPrefReason) {
        throw new ErrorWithStatusCode("Second Preference Reason is required", 400);
    }
    if(!participant.pastExperience) {
        throw new ErrorWithStatusCode("Past Experience is required", 400);
    }
    return (
        ValidateName(participant.name) &&
        ValidateEmail(participant.email) &&
        ValidatePhone(participant.phone) &&
        ValidateCollegeId(participant.collegeId) &&
        ValidateYear(participant.year) &&
        ValidatePreference(participant.firstPreference, "first") &&
        ValidatePreference(participant.secondPreference, "second")
    );
}
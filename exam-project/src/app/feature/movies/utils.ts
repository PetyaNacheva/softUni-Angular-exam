import { AbstractControl, ValidationErrors } from "@angular/forms";

export function actorsValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value.trim();

    if (!value) {
        return null;
    }

    if (value.length > 1 && value.includes(',')) {
        const arr = value.split(',\n');
        if (arr.length > 1) {
            return null;
        }
        return { ingredientsLength: true };
    } else {
        return { ingredients: true };
    }
}

export function urlValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
        return null;
    }

    if (!/^https?:\/\/(.+)/.test(value)) {
        return {
            urlV: true,
        }
    }

    return null;
}
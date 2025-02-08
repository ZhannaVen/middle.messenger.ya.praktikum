function getFormData(formElement: HTMLFormElement) {
    const formData = new FormData(formElement);
    const data: { [key: string]: string } = {};

    formData.forEach((value, key) => {
        data[key] = value.toString();
    });

    return data;
}

export {getFormData}

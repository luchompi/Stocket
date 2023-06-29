
export const errorValidator = (error: any) => {
    const errorArray = error;
    let errorMessage = ''
    try {
                for (const field in errorArray) {
                    if (errorArray.hasOwnProperty(field)) {
                        errorMessage += `${field}: ${errorArray[field].join(', ')}\n`;
                    }

                }
            }
            catch (error) {
                errorMessage = errorArray.detail
            }
            finally {
                return errorMessage
            }
}



/**
 * Імпортує JSON
 */
export class JsonImporter {
    static import(url) {
        return (new JsonImporter(url).import())
    }

    /**
     *
     * @param url
     *
     * @private
     */
    constructor(url) {
        this.url = url;
    }

    async import() {
        return new Promise((success, error) => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', this.url, true);

            xhr.onreadystatechange = () => {
                if (xhr.readyState !== 4) return;

                const status = xhr.status;

                if (status !== 200) {
                    const errorMessage = `Failed to import JSON file. XHR status: ${status}.`;

                    console.warn(errorMessage);

                    return error(new Error(errorMessage));
                }

                return success(JSON.parse(xhr.responseText));
            };

            xhr.send();
        });
    }
}

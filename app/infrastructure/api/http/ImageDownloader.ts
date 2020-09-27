export default class ImageDownloader {

    public downloadAsBase64(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.onload = () => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result as string)
                reader.readAsDataURL(xhr.response)
            }
            xhr.open('GET', url)
            xhr.responseType = 'blob'
            xhr.addEventListener('error', (e) => reject('Unable to download image ' + url))

            xhr.send()
        })
    }

}
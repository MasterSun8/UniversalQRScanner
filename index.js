let res = document.getElementById('result')

window.addEventListener('load', function () {
    let selectedDeviceId
    const codeReader = new ZXing.BrowserMultiFormatReader()
    console.log('ZXing code reader initialized')
    codeReader.listVideoInputDevices()
        .then((videoInputDevices) => {
            const sourceSelect = document.getElementById('sourceSelect')
            selectedDeviceId = videoInputDevices[0].deviceId
            if (videoInputDevices.length >= 1) {
                videoInputDevices.forEach((element) => {
                    const sourceOption = document.createElement('option')
                    sourceOption.text = element.label
                    sourceOption.value = element.deviceId
                    sourceSelect.appendChild(sourceOption)
                })

                sourceSelect.onchange = () => {
                    selectedDeviceId = sourceSelect.value;
                }
                codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
                    if (result) {
                        console.log(result)
                        res.textContent = "Result: " + result.text
                    }
                    if (err && !(err instanceof ZXing.NotFoundException)) {
                        console.error(err)
                        res.textContent = err
                    }
                })
                console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
            }

        })
        .catch((err) => {
            console.error(err)
        })
})
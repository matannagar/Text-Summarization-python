import React from 'react'
import { useDropzone } from 'react-dropzone'

function Dragndrop({ setFile, setSummary }) {
    const { getRootProps, getInputProps } = useDropzone({
        accept: "pdf/*",
        onDrop: (filesArray) => {
            console.log("File loaded via dropzone")
            setFile(filesArray[0])
            setSummary('')
        }
    })

    return (
        <div className="item">
            <div className="dragndrop">
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drop file here</p>
                </div>
            </div>
        </div>
    )
}

export default Dragndrop

import { useState } from 'react';
import { FaPaperPlane, FaFileDownload } from 'react-icons/fa';
import { getDownloadLink } from './downloader-service';


import './downloader-style.css';
import axios from 'axios';

const FullScreenLoader = () => (
    <div className="full-screen-loader">
        <div className="loader" />
    </div>
);

const Downloader = () => {
    const [url, setUrl] = useState('');
    const [downloadData, setDownloadData] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = async () => {
        setIsLoading(true);
        try {
            const data = await getDownloadLink(url);

            if (data) {
                setDownloadData(data);
            }

        } catch (error) {
            console.error('Error downloading the file:', error);
        } finally {
            setIsLoading(false);
        }


    };

    const downloadFile = (fileUrl, fileName) => {
        axios({
            url: fileUrl,
            method: 'GET',
            responseType: 'blob',  // Esto nos asegura que la respuesta será un archivo binario (blob)
        })
            .then((response) => {
                const blob = new Blob([response.data], { type: 'audio/mp4' });
                const url = window.URL.createObjectURL(blob);  // Crear un enlace temporal
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;  // Usamos el nombre del archivo proporcionado
                link.click();  // Simula el clic para iniciar la descarga
                window.URL.revokeObjectURL(url);  // Liberar la URL temporal
            })
            .catch((error) => {
                console.error('Error downloading the file:', error);
            });
    };

    return (
        <div>
            {isLoading && <FullScreenLoader />}
            <div style={{ textAlign: 'center' }}>
                <h1>MP3 Downloader</h1>
            </div>

            <div className="form-box">
                <input
                    className="url-input"
                    type="text"
                    placeholder="Enter URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button className="download-button" onClick={handleDownload} disabled={isLoading}>
                    {isLoading ? 'Loading...' : <FaPaperPlane />}
                </button>
            </div>

            {downloadData && (
                <div className="download-link-box">
                    <button
                        className="download-link"
                        onClick={() => downloadFile(downloadData.download_url, downloadData.title)}  // Llamar a la función de descarga en lugar de// Lo hacemos visible
                    >
                        DOWNLOAD AUDIO <FaFileDownload />
                    </button>
                    <h2>{downloadData.title}</h2>
                    <img className='cover' src={downloadData.thumbnail_url} alt={downloadData.title} />

                </div>
            )}
        </div>
    );
};

export default Downloader;

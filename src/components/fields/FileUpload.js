import React from "react";

export const FileUpload = ({ label, error, value, currentValue, name, onChange }) => {
    const [previewUrl, setPreviewUrl] = React.useState('');

    React.useEffect(() => {
        if (value) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
        };
            reader.readAsDataURL(value);
        } else {
            setPreviewUrl('');
        }
    }, [value]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        onChange(file);
    };
    
    return (
        <div className="file-upload">
            <div className="flex flex-col">
                {label && (
                    <div className="label">
                        <span className="!text-xs">{label}</span>
                    </div>
                )}
                <input
                    type="file"
                    name={name}
                    onChange={handleFileChange}
                    />
            </div>
            {previewUrl && (
                <div className="preview mt-2">
                    <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                </div>
            )}
            {!previewUrl && currentValue && (
                 <div className="preview mt-2">
                 <img src={currentValue} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
             </div>
            )}
            {error && <p className="error">{error}</p>}
        </div>
      );
}
import React, { useState } from "react";
import axios from "axios";
import './LinkForm.css';

const LinkForm = ({ userId, fetchLinks }) => {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("https://linktree-mg98.onrender.com/api/links/add", { userId, name, url, order: 0 });
            fetchLinks(); // Refresh the list of links
            setName("");
            setUrl("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="link-form">
            <input
                type="text"
                placeholder="Link Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Link URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <button type="submit">Add Link</button>
        </form>
    );
};

export default LinkForm;
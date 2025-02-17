import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ExternalLink, Github, Twitter, Instagram, Linkedin } from "lucide-react";
import './PublicProfile.css';

const PublicProfile = () => {
    const { username } = useParams();
    const [links, setLinks] = useState([]);
    // const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;
    const avatarUrl = `https://i1.sndcdn.com/artworks-bAq8V5mdeNgSfzW6-qSp9OA-t500x500.png`;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`https://linktree-mg98.onrender.com/api/links/user/${username}`);
                setLinks(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, [username]);

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img 
                    src={avatarUrl} 
                    alt={username} 
                    className="profile-avatar"
                />
                <h1>@{username}</h1>
                <p className="profile-bio">
                    Digital creator & web enthusiast sharing my favorite links with you ✨
                </p>
            </div>

            <ul className="profile-links">
                {links.map((link) => (
                    <li key={link._id} className="profile-link-item">
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="profile-link-icon" />
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PublicProfile;
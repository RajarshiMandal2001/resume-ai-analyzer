import React, { useState } from "react";
import API from "../services/api";
import hrSvg from "../assets/hr_girl_scanning_resume.svg";

export default function Home() {
    const [file, setFile] = useState(null);
    const [jobDescription, setJobDescription] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!file || !jobDescription) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("job_description", jobDescription);

        try {
            setLoading(true);
            setResult(null);

            const response = await API.post("/analyze", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setResult(response.data);
        } catch (error) {
            console.error(error);
            alert("Analysis failed. Please make sure the backend is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-container">
            {/* Left Panel - Input Form */}
            <div className="left-panel">
                <h1 className="title">Resume AI</h1>
                <p className="subtitle">Optimize your resume for ATS with AI-powered analysis.</p>

                <div className="file-upload-wrapper">
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                            const selectedFile = e.target.files[0];
                            if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
                                alert("File size exceeds 5MB limit. Please choose a smaller file.");
                                e.target.value = null;
                                setFile(null);
                            } else {
                                setFile(selectedFile);
                            }
                        }}
                        className="file-upload-input"
                    />
                    <div className="file-upload-box">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="17 8 12 3 7 8"></polyline>
                            <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <p>{file ? "File selected" : "Upload your resume (PDF)"}</p>
                        {file && <p className="file-name">{file.name}</p>}
                    </div>
                </div>

                <textarea
                    placeholder="Paste the job description here to see how well your resume matches..."
                    className="description-input"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    maxLength={1500}
                />
                <div style={{ textAlign: 'right', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '-16px', marginBottom: '16px' }}>
                    {jobDescription.length}/1500 characters
                </div>

                <button
                    onClick={handleAnalyze}
                    className="analyze-button"
                    disabled={loading || !file || !jobDescription}
                >
                    {loading ? (
                        <>
                            <div className="loading-spinner"></div>
                            <span className="loading-text">Analyzing...</span>
                        </>
                    ) : "Analyze Resume"}
                </button>
            </div>

            {/* Right Panel - Results or Empty State */}
            <div className="right-panel">
                {!result && !loading && (
                    <div className="empty-state">
                        <img src={hrSvg} alt="HR Professional scanning resume" className="hero-illustration" />
                        <h3>Ready for your analysis</h3>
                        <p>Upload a resume and job description to get started.</p>
                    </div>
                )}

                {loading && !result && (
                    <div className="empty-state">
                        <img src={hrSvg} alt="HR Professional scanning resume" className="hero-illustration" style={{ animationDuration: '2s' }} />
                        <h3 className="title" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>AI is working its magic...</h3>
                    </div>
                )}

                {result && (
                    <div className="results-container">
                        <div className="score-card">
                            <div
                                className="score-circle"
                                style={{ "--score": result.analysis.match_score }}
                            >
                                <span className="score-text">{result.analysis.match_score}%</span>
                            </div>
                            <h2 className="title" style={{ fontSize: '1.5rem' }}>ATS Match Score</h2>
                        </div>

                        <div className="skills-section">
                            <h3 className="skills-title">Matched Skills</h3>
                            <div className="skills-list">
                                {result.analysis.matched_skills.map((skill, index) => (
                                    <span key={index} className="skill-badge matched">
                                        {skill}
                                    </span>
                                ))}
                                {result.analysis.matched_skills.length === 0 && (
                                    <span className="text-muted" style={{ fontSize: '0.9rem' }}>None found.</span>
                                )}
                            </div>
                        </div>

                        <div className="skills-section">
                            <h3 className="skills-title">Missing Skills</h3>
                            <div className="skills-list">
                                {result.analysis.missing_skills.map((skill, index) => (
                                    <span key={index} className="skill-badge missing">
                                        {skill}
                                    </span>
                                ))}
                                {result.analysis.missing_skills.length === 0 && (
                                    <span className="text-muted" style={{ fontSize: '0.9rem' }}>You have all the required skills!</span>
                                )}
                            </div>
                        </div>

                        <div className="skills-section">
                            <h3 className="skills-title">AI Recommendations</h3>
                            <div className="recommendations">
                                <ul>
                                    {result.analysis.recommendations.map((rec, index) => (
                                        <li key={index}>{rec}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
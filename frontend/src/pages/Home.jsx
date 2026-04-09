import React, { useState } from "react";
import API from "../services/api";

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

            const response = await API.post("/analyze", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setResult(response.data);
        } catch (error) {
            console.error(error);
            alert("Analysis failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6">AI Resume Analyzer</h1>

                <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mb-4"
                />

                <textarea
                    placeholder="Paste job description here..."
                    className="w-full h-40 border rounded-lg p-4 mb-4"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                />

                <button
                    onClick={handleAnalyze}
                    className="bg-black text-white px-6 py-3 rounded-lg"
                >
                    {loading ? "Analyzing..." : "Analyze Resume"}
                </button>

                {result && (
                    <div className="mt-8 space-y-4">
                        <div className="text-2xl font-semibold">
                            ATS Score: {result.analysis.match_score}%
                        </div>

                        <div>
                            <h2 className="font-bold">Matched Skills</h2>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {result.analysis.matched_skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-green-100 px-3 py-1 rounded-full"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="font-bold">Missing Skills</h2>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {result.analysis.missing_skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-red-100 px-3 py-1 rounded-full"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="font-bold">Recommendations</h2>
                            <ul className="list-disc pl-6">
                                {result.analysis.recommendations.map((rec, index) => (
                                    <li key={index}>{rec}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
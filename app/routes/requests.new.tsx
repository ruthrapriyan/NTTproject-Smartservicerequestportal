import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";

export default function CreateRequest() {
    const [formData, setFormData] = useState({
        title: "",
        category: "IT",
        description: "",
        priority: "Medium",
        requester_name: "",
        requester_email: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://127.0.0.1:8000/requests", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error("Failed to create request");

            navigate("/");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
            <div className="card">
                <h1 style={{ marginBottom: "1.5rem" }}>Create New Service Request</h1>
                {error && <div style={{ color: "var(--error)", marginBottom: "1rem" }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            required
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                        <div className="form-group">
                            <label>Category</label>
                            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                <option value="IT">IT</option>
                                <option value="Admin">Admin</option>
                                <option value="Facilities">Facilities</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Priority</label>
                            <select value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            rows={4}
                            required
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <hr style={{ margin: "1.5rem 0", borderTop: "1px solid var(--border)" }} />
                    <h3 style={{ marginBottom: "1rem" }}>Requester Information</h3>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            required
                            value={formData.requester_name}
                            onChange={e => setFormData({ ...formData, requester_name: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            required
                            value={formData.requester_email}
                            onChange={e => setFormData({ ...formData, requester_email: e.target.value })}
                        />
                    </div>

                    <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
                        <button type="button" onClick={() => navigate("/")} style={{ flex: 1, background: "#f1f5f9" }}>Cancel</button>
                        <button type="submit" className="btn-primary" style={{ flex: 2 }} disabled={loading}>
                            {loading ? "Creating..." : "Submit Request"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

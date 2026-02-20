import { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react";

interface RequestItem {
    id: number;
    title: string;
    category: string;
    priority: string;
    status: string;
    requester_name: string;
    requester_email: string;
}

export default function Dashboard() {
    const [requests, setRequests] = useState<RequestItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filters, setFilters] = useState({ category: "", status: "", priority: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        fetchRequests(token);
    }, [navigate]);

    const fetchRequests = async (token: string) => {
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/requests", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                    return;
                }
                throw new Error("Failed to fetch requests");
            }
            const data = await response.json();
            setRequests(data);
        } catch (err: any) {
            setError("Failed to connect to the backend server. Please ensure http://127.0.0.1:8000 is running.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id: number, newStatus: string) => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://127.0.0.1:8000/requests/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            if (!response.ok) throw new Error("Failed to update status");

            // Update local state
            setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
        } catch (err: any) {
            alert(err.message);
        }
    };

    const filteredRequests = requests.filter(req => {
        return (
            (filters.category === "" || req.category === filters.category) &&
            (filters.status === "" || req.status === filters.status) &&
            (filters.priority === "" || req.priority === filters.priority)
        );
    });

    if (loading) return <div style={{ textAlign: "center", padding: "2rem" }}>Loading requests...</div>;

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h1>Request Dashboard</h1>
                <button onClick={() => navigate("/requests/new")} className="btn-primary">Create New Request</button>
            </div>

            {error && <div style={{ color: "var(--error)", marginBottom: "1rem" }}>{error}</div>}

            <div className="card" style={{ marginBottom: "2rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                    <div>
                        <label>Category</label>
                        <select value={filters.category} onChange={e => setFilters({ ...filters, category: e.target.value })}>
                            <option value="">All Categories</option>
                            <option value="IT">IT</option>
                            <option value="Admin">Admin</option>
                            <option value="Facilities">Facilities</option>
                        </select>
                    </div>
                    <div>
                        <label>Status</label>
                        <select value={filters.status} onChange={e => setFilters({ ...filters, status: e.target.value })}>
                            <option value="">All Statuses</option>
                            <option value="Open">Open</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Resolved">Resolved</option>
                        </select>
                    </div>
                    <div>
                        <label>Priority</label>
                        <select value={filters.priority} onChange={e => setFilters({ ...filters, priority: e.target.value })}>
                            <option value="">All Priorities</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="card" style={{ overflowX: "auto" }}>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Requester</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map(req => (
                            <tr key={req.id}>
                                <td>{req.title}</td>
                                <td>{req.category}</td>
                                <td>
                                    <span className={`badge badge-priority-${req.priority.toLowerCase()}`}>
                                        {req.priority}
                                    </span>
                                </td>
                                <td>{req.status}</td>
                                <td>
                                    <div>{req.requester_name}</div>
                                    <small style={{ color: "#64748b" }}>{req.requester_email}</small>
                                </td>
                                <td>
                                    <select
                                        value={req.status}
                                        onChange={(e) => handleUpdateStatus(req.id, e.target.value)}
                                        style={{ width: "auto" }}
                                    >
                                        <option value="Open">Open</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                        {filteredRequests.length === 0 && (
                            <tr>
                                <td colSpan={6} style={{ textAlign: "center", padding: "2rem" }}>No requests found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

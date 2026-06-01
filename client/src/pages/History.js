import { useEffect, useState } from 'react';
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import { getEmailHistory } from '../services/api';

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    async function loadHistory() {
      try {
        setLoading(true);
        const data = await getEmailHistory();
        if (mounted) {
          setHistory(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadHistory();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="page-section">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Audit Trail</p>
          <h2>Email History</h2>
        </div>
      </div>

      <div className="content-panel">
        <Alert type="error">{error}</Alert>

        {loading ? (
          <div className="empty-state">
            <Loader label="Loading history" />
          </div>
        ) : history.length === 0 ? (
          <div className="empty-state">No email history found.</div>
        ) : (
          <div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Recipients</th>
                  <th>Status</th>
                  <th>Sent Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item._id}>
                    <td>{item.subject}</td>
                    <td>{item.recipients.join(', ')}</td>
                    <td>
                      <span className={`status-pill status-${item.status}`}>{item.status}</span>
                    </td>
                    <td>{new Date(item.sentAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default History;

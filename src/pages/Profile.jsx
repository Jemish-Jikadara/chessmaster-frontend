import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const THEMES = {
  classic: ['#f0d9b5', '#b58863'],
  midnight: ['#6b7fa3', '#2c3e6b'],
  forest: ['#ffffdd', '#6faa3f'],
  ocean: ['#d6eaf8', '#2e86c1'],
  ruby: ['#f5cba7', '#b91c1c'],
  walnut: ['#e8d5b0', '#6b4226'],
};

const pageStyles = `
.h-page{
  --h-bg:#0f1411;
  --h-panel:#1b241d;
  --h-panel-2:#222d24;
  --h-line:rgba(255,255,255,0.09);
  --h-text:#f5f7f1;
  --h-muted:#aeb7aa;
  --h-soft:#d7ded0;
  --h-green:#81b64c;
  --h-green-2:#95c95e;
  --h-dark-green:#5d8b32;
  --h-gold:#f0c15b;
  --h-orange:#e58b42;
  background:
    linear-gradient(180deg,rgba(129,182,76,0.08),transparent 360px),
    radial-gradient(circle at 15% 8%,rgba(129,182,76,0.18),transparent 34%),
    radial-gradient(circle at 85% 12%,rgba(240,193,91,0.1),transparent 32%),
    var(--h-bg);
  color:var(--h-text);
}

.h-page *{ box-sizing:border-box; }

.cm2-wrap{
  width:min(1180px,calc(100% - 40px));
  margin:0 auto;
}

.cm2-divider{
  height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.13),transparent);
}

.cm2-section{
  padding:76px 0;
}

.cm2-eyebrow{
  display:inline-flex;
  align-items:center;
  gap:9px;
  color:var(--h-green-2);
  font-size:12px;
  line-height:1;
  font-weight:800;
  text-transform:uppercase;
  letter-spacing:.14em;
  margin-bottom:18px;
}

.cm2-eyebrow .sq{
  width:9px;
  height:9px;
  border-radius:2px;
  background:var(--h-green);
  box-shadow:0 0 0 5px rgba(129,182,76,.12);
}

.cm2-h1{
  margin:0;
  color:var(--h-text);
  font-size:clamp(2.2rem,5vw,3.2rem);
  line-height:1.02;
  letter-spacing:0;
  font-weight:900;
}

.cm2-h2{
  margin:0;
  color:var(--h-text);
  font-size:clamp(1.8rem,4vw,2.4rem);
  line-height:1.05;
  letter-spacing:0;
  font-weight:900;
}

.cm2-h3{
  margin:0 0 10px;
  color:var(--h-text);
  font-size:20px;
  line-height:1.2;
  font-weight:850;
}

.cm2-accent{
  color:var(--h-green-2);
}

.cm2-sub{
  max-width:620px;
  margin:22px 0 0;
  color:var(--h-muted);
  font-size:17px;
  line-height:1.72;
}

.cm2-btn{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  gap:8px;
  min-height:48px;
  padding:0 20px;
  border-radius:8px;
  font-size:15px;
  font-weight:850;
  text-decoration:none;
  border:1px solid transparent;
  transition:transform .18s ease, box-shadow .18s ease, background .18s ease, border-color .18s ease;
  cursor:pointer;
}

.cm2-btn:hover{
  transform:translateY(-2px);
}

.cm2-btn-primary{
  color:#10180e;
  background:linear-gradient(180deg,#9bd761,#7fb64a);
  box-shadow:0 16px 30px rgba(129,182,76,.25), inset 0 1px rgba(255,255,255,.45);
}

.cm2-btn-primary:hover{
  background:linear-gradient(180deg,#a8e372,#82bd4a);
  box-shadow:0 20px 38px rgba(129,182,76,.32), inset 0 1px rgba(255,255,255,.55);
}

.cm2-btn-secondary{
  color:#f4f7ef;
  background:rgba(255,255,255,.075);
  border-color:rgba(255,255,255,.13);
}

.cm2-btn-secondary:hover{
  background:rgba(255,255,255,.11);
  border-color:rgba(255,255,255,.2);
}

/* Profile header */
.profile-header{
  position:relative;
  padding:88px 0 72px;
}

.profile-header::before{
  content:'';
  position:absolute;
  inset:0;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size:58px 58px;
  mask-image:linear-gradient(to bottom,#000,transparent 78%);
  pointer-events:none;
}

.profile-top{
  display:grid;
  grid-template-columns:minmax(0,1.1fr) minmax(260px,0.9fr);
  gap:56px;
  align-items:center;
  position:relative;
  z-index:1;
}

@media (max-width:960px){
  .profile-top{
    grid-template-columns:1fr;
    gap:38px;
    text-align:center;
  }
}

.profile-avatar{
  width:120px;height:120px;
  border-radius:50%;
  background:linear-gradient(135deg,var(--h-green-2),var(--h-green));
  display:flex;align-items:center;justify-content:center;
  font-size:48px;font-weight:900;color:#10180e;
  border:4px solid var(--h-bg);
  box-shadow:0 0 0 2px rgba(129,182,76,0.4),0 8px 32px rgba(129,182,76,0.25);
  flex-shrink:0;
  overflow:hidden;
  margin:0 auto;
}

.profile-avatar-img{
  width:100%;height:100%;
  object-fit:cover;
  display:block;
}

.profile-info h1{
  margin:0 0 8px;
  color:var(--h-text);
  font-size:clamp(2rem,5vw,2.8rem);
  line-height:1.02;
  font-weight:900;
}

.profile-fullname{
  font-size:14px;
  color:var(--h-muted);
  margin-bottom:14px;
}

.profile-meta{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  justify-content:center;
}

.meta-pill{
  display:inline-flex;
  align-items:center;
  gap:4px;
  font-size:12px;
  color:var(--h-muted);
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.09);
  padding:4px 10px;
  border-radius:100px;
  font-weight:800;
}

.profile-bio{
  max-width:620px;
  margin:22px auto 0;
  color:var(--h-muted);
  font-size:16px;
  line-height:1.7;
}

.profile-actions{
  display:flex;
  gap:12px;
  flex-wrap:wrap;
  justify-content:center;
  margin-top:26px;
}

/* Ratings & stats */
.ratings-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:16px;
  margin-top:34px;
}

@media (max-width:768px){
  .ratings-grid{
    grid-template-columns:1fr;
  }
}

.rating-card{
  position:relative;
  height:100%;
  padding:22px;
  border-radius:12px;
  background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.04));
  border:1px solid rgba(255,255,255,.1);
  box-shadow:0 20px 44px rgba(0,0,0,.18);
  transition:transform .2s ease, border-color .2s ease, background .2s ease;
}

.rating-card:hover{
  transform:translateY(-4px);
  border-color:rgba(129,182,76,.34);
  background:linear-gradient(180deg,rgba(255,255,255,.095),rgba(255,255,255,.048));
}

.rc-mode{
  font-size:11px;
  color:var(--h-muted);
  text-transform:uppercase;
  letter-spacing:0.1em;
  font-weight:800;
  margin-bottom:6px;
}

.rc-val{
  font-size:32px;
  font-weight:900;
  color:#ffffff;
  margin-bottom:4px;
}

.rc-sub{
  font-size:12px;
  color:var(--h-muted);
}

.stats-row{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:16px;
  margin-top:34px;
}

@media (max-width:768px){
  .stats-row{
    grid-template-columns:1fr;
  }
}

.stat-box{
  position:relative;
  height:100%;
  padding:22px;
  border-radius:12px;
  background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.04));
  border:1px solid rgba(255,255,255,.1);
  box-shadow:0 20px 44px rgba(0,0,0,.18);
  text-align:center;
}

.sb-val{
  font-size:32px;
  font-weight:900;
  color:#ffffff;
  margin-bottom:6px;
}

.sb-label{
  font-size:12px;
  color:var(--h-muted);
  text-transform:uppercase;
  letter-spacing:0.08em;
  font-weight:800;
}

/* Table */
.table-wrap{
  margin-top:34px;
  background:rgba(255,255,255,.045);
  border:1px solid rgba(255,255,255,.09);
  border-radius:12px;
  overflow:hidden;
}

.profile-body table{
  width:100%;
  border-collapse:collapse;
}

.profile-body thead{
  background:rgba(255,255,255,.06);
  border-bottom:1px solid var(--h-line);
}

.profile-body th{
  padding:14px 16px;
  font-size:11px;
  font-weight:800;
  text-transform:uppercase;
  letter-spacing:0.1em;
  color:var(--h-muted);
  text-align:left;
}

.profile-body td{
  padding:14px 16px;
  font-size:13px;
  color:var(--h-text);
  border-bottom:1px solid rgba(255,255,255,.05);
}

.profile-body tr:last-child td{
  border-bottom:none;
}

.profile-body tr:hover td{
  background:rgba(255,255,255,.02);
}

.td-p{
  color:#ffffff;
  font-weight:850;
}

.bw,.bb,.bd{
  padding:4px 10px;
  border-radius:100px;
  font-size:11px;
  font-weight:800;
}

.bw{
  background:rgba(255,255,255,.08);
  border:1px solid rgba(255,255,255,.18);
  color:#ffffff;
}

.bb{
  background:rgba(0,0,0,.35);
  border:1px solid var(--h-line);
  color:var(--h-muted);
}

.bd{
  background:rgba(129,182,76,.15);
  border:1px solid rgba(129,182,76,.3);
  color:var(--h-green-2);
}

.btn-watch{
  padding:6px 12px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.09);
  border-radius:8px;
  color:var(--h-green-2);
  font-size:12px;
  text-decoration:none;
  transition:all 0.2s;
}

.btn-watch:hover{
  background:rgba(129,182,76,.12);
  border-color:rgba(129,182,76,.35);
  color:#ffffff;
}

.empty-row{
  text-align:center;
  color:var(--h-muted);
  padding:32px !important;
}

/* Side cards */
.profile-body{
  display:grid;
  grid-template-columns:1fr 320px;
  gap:24px;
  margin-top:34px;
}

@media (max-width:960px){
  .profile-body{
    grid-template-columns:1fr;
  }
}

.right-col{
  display:flex;
  flex-direction:column;
  gap:16px;
}

.side-card{
  position:relative;
  height:100%;
  padding:22px;
  border-radius:12px;
  background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.04));
  border:1px solid rgba(255,255,255,.1);
  box-shadow:0 20px 44px rgba(0,0,0,.18);
}

.side-card-title{
  margin:0 0 16px;
  color:var(--h-text);
  font-size:13px;
  font-weight:850;
  text-transform:uppercase;
  letter-spacing:0.12em;
}

.info-row{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:8px 0;
  border-bottom:1px solid rgba(255,255,255,.05);
}

.info-row:last-child{
  border-bottom:none;
}

.ir-label{
  font-size:12px;
  color:var(--h-muted);
}

.ir-value{
  font-size:12px;
  color:var(--h-text);
  font-weight:700;
}

.mini-board{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  border-radius:8px;
  overflow:hidden;
  margin:10px 0;
}

.mb-sq{
  aspect-ratio:1;
}

/* Responsive tweaks */
@media (max-width:560px){
  .cm2-wrap{
    width:min(100% - 24px,1180px);
  }
  .profile-header{
    padding:46px 0 44px;
  }
  .cm2-section{
    padding:56px 0;
  }
}
`;

const Profile = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    api.get('/profile')
      .then((res) => {
        if (!mounted) return;
        setUser(res.data.user);
        setGames(res.data.games || []);
      })
      .catch(() => mounted && setError('Could not load your profile.'))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <main className="h-page" style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div className="cm2-wrap" style={{ textAlign:'center' }}>
          <p style={{ color:'var(--h-green-2)', fontSize:16 }}>Loading profile...</p>
        </div>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="h-page" style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div className="cm2-wrap" style={{ textAlign:'center' }}>
          <p style={{ color:'#ff8585', fontSize:16 }}>{error || 'Profile not found.'}</p>
        </div>
      </main>
    );
  }

  const t = THEMES[user.boardTheme] || THEMES.classic;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageStyles }} />

      <main className="h-page" style={{ display:'block', padding:0 }}>
        {/* Profile Header */}
        <section className="profile-header">
          <div className="cm2-wrap profile-top">
            <div className="profile-info">
              <span className="cm2-eyebrow">
                <span className="sq"></span>
                Player Profile
              </span>
              <h1 className="cm2-h1">
                {user.username}
                <span className="cm2-accent">.</span>
              </h1>
              {user.fullName && <div className="profile-fullname">{user.fullName}</div>}
              <div className="profile-meta">
                {user.country && <span className="meta-pill">Country: {user.country}</span>}
                <span className="meta-pill">{user.gamesPlayed || 0} games</span>
                {user.createdAt && (
                  <span className="meta-pill">
                    Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                )}
                <span className="meta-pill">{user.friends ? user.friends.length : 0} friends</span>
              </div>
              {user.bio && <p className="cm2-sub" style={{ maxWidth:'none' }}>{user.bio}</p>}
            </div>

            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
              <div className="profile-avatar">
                {user.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="profile-avatar-img" />
                ) : (
                  user.username?.charAt(0)?.toUpperCase()
                )}
              </div>
              <div className="profile-actions">
                <Link to="/play" className="cm2-btn cm2-btn-primary">Play</Link>
                <Link to="/settings" className="cm2-btn cm2-btn-secondary">Settings</Link>
                <button type="button" className="cm2-btn cm2-btn-secondary" onClick={logout}>Logout</button>
              </div>
            </div>
          </div>
        </section>

        <div className="cm2-wrap"><div className="cm2-divider"></div></div>

        {/* Ratings & Stats */}
        <section className="cm2-section">
          <div className="cm2-wrap">
            <span className="cm2-eyebrow">
              <span className="sq"></span>
              Performance
            </span>
            <h2 className="cm2-h2">Your chess ratings</h2>
            <p className="cm2-sub">Rapid, Blitz and Bullet ratings based on your games.</p>

            <div className="ratings-grid">
              <div className="rating-card">
                <div className="rc-mode">Rapid</div>
                <div className="rc-val">{user.rapidRating || 1200}</div>
                <div className="rc-sub">Rating</div>
              </div>
              <div className="rating-card">
                <div className="rc-mode">Blitz</div>
                <div className="rc-val">{user.blitzRating || 1200}</div>
                <div className="rc-sub">Rating</div>
              </div>
              <div className="rating-card">
                <div className="rc-mode">Bullet</div>
                <div className="rc-val">{user.bulletRating || 1200}</div>
                <div className="rc-sub">Rating</div>
              </div>
            </div>

            <div className="stats-row">
              <div className="stat-box">
                <div className="sb-val">{user.wins || 0}</div>
                <div className="sb-label">Wins</div>
              </div>
              <div className="stat-box">
                <div className="sb-val">{user.losses || 0}</div>
                <div className="sb-label">Losses</div>
              </div>
              <div className="stat-box">
                <div className="sb-val">{user.draws || 0}</div>
                <div className="sb-label">Draws</div>
              </div>
            </div>
          </div>
        </section>

        <div className="cm2-wrap"><div className="cm2-divider"></div></div>

        {/* Recent Games & Side Info */}
        <section className="cm2-section">
          <div className="cm2-wrap">
            <span className="cm2-eyebrow">
              <span className="sq"></span>
              Match history
            </span>
            <h2 className="cm2-h2">Recent games</h2>
            <p className="cm2-sub">Your latest played games with results and quick replay links.</p>

            <div className="profile-body">
              <div>
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>White</th>
                        <th>Black</th>
                        <th>Winner</th>
                        <th>Moves</th>
                        <th>Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {(!games || games.length === 0) ? (
                        <tr><td colSpan="7" className="empty-row">No games yet, go play!</td></tr>
                      ) : (
                        games.map((game, index) => (
                          <tr key={game._id}>
                            <td style={{ color: 'var(--h-muted)' }}>{index + 1}</td>
                            <td className="td-p">{game.whitePlayer}</td>
                            <td className="td-p">{game.blackPlayer}</td>
                            <td>
                              {game.winner === 'white' ? (
                                <span className="bw">White</span>
                              ) : game.winner === 'black' ? (
                                <span className="bb">Black</span>
                              ) : (
                                <span className="bd">Draw</span>
                              )}
                            </td>
                            <td>{game.totalMoves}</td>
                            <td>{new Date(game.createdAt).toLocaleDateString()}</td>
                            <td><Link to={`/game/${game._id}`} className="btn-watch">View</Link></td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="right-col">
                <div className="side-card">
                  <div className="side-card-title">Account</div>
                  <div className="info-row">
                    <span className="ir-label">Email</span>
                    <span className="ir-value" style={{ color: 'var(--h-muted)', fontSize: '11px' }}>{user.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="ir-label">Role</span>
                    <span className="ir-value">{user.role}</span>
                  </div>
                  <div className="info-row">
                    <span className="ir-label">Total Games</span>
                    <span className="ir-value">{user.gamesPlayed || 0}</span>
                  </div>
                  {user.dateOfBirth && (
                    <div className="info-row">
                      <span className="ir-label">Birthday</span>
                      <span className="ir-value">{new Date(user.dateOfBirth).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </div>
                  )}
                </div>

                <div className="side-card">
                  <div className="side-card-title">Board Theme</div>
                  <div className="mini-board">
                    {Array.from({ length: 16 }, (_, i) => (
                      <div key={i} className="mb-sq" style={{ background: (Math.floor(i / 4) + i) % 2 === 0 ? t[0] : t[1] }} />
                    ))}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--h-muted)', textAlign: 'center', textTransform: 'capitalize', marginBottom: '10px' }}>
                    {user.boardTheme || 'classic'}
                  </div>
                  <Link to="/settings" style={{ display: 'block', textAlign: 'center', fontSize: '12px', color: 'var(--h-green-2)', textDecoration: 'none', fontWeight:800 }}>
                    Change theme →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
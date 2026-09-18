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
  min-height:44px;
  padding:0 18px;
  border-radius:8px;
  font-size:14px;
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

.cm2-btn-danger{
  color:#ff8585;
  background:rgba(255,255,255,.06);
  border-color:rgba(255,100,100,.25);
}

.cm2-btn-danger:hover{
  background:rgba(255,100,100,.12);
  border-color:rgba(255,100,100,.45);
}

/* Profile banner - same structure, only theme colors updated */
.profile-banner{
  position:relative;
  padding:72px 0 40px;
  border-bottom:1px solid var(--h-line);
  background:
    linear-gradient(135deg,rgba(129,182,76,0.10) 0%,rgba(129,182,76,0.04) 50%,transparent 100%);
  overflow:hidden;
}

.profile-banner::before{
  content:'';
  position:absolute;
  width:600px;height:600px;
  background:radial-gradient(circle,rgba(129,182,76,0.12) 0%,transparent 70%);
  top:-200px;right:-100px;
  pointer-events:none;
}

.banner-inner{
  max-width:1100px;
  margin:0 auto;
  position:relative;
  z-index:1;
}

.avatar-row{
  display:flex;
  align-items:flex-end;
  gap:24px;
  margin-bottom:20px;
  flex-wrap:wrap;
}

.profile-avatar{
  width:100px;height:100px;
  border-radius:50%;
  background:linear-gradient(135deg,var(--h-green-2),var(--h-green));
  display:flex;align-items:center;justify-content:center;
  font-size:40px;font-weight:900;color:#10180e;
  border:4px solid var(--h-bg);
  box-shadow:0 0 0 2px rgba(129,182,76,0.4),0 8px 32px rgba(129,182,76,0.25);
  flex-shrink:0;
  overflow:hidden;
}

.profile-avatar-img{
  width:100%;height:100%;
  object-fit:cover;
  display:block;
}

.avatar-info{
  flex:1;
  padding-bottom:4px;
}

.profile-username{
  font-size:clamp(1.8rem,4vw,2.6rem);
  font-weight:900;
  color:var(--h-text);
  margin:0 0 4px;
  letter-spacing:-0.02em;
}

.profile-fullname{
  font-size:14px;
  color:var(--h-muted);
  margin-bottom:10px;
}

.profile-meta{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
}

.meta-pill{
  display:inline-flex;
  align-items:center;
  gap:4px;
  font-size:12px;
  color:var(--h-muted);
  background:rgba(255,255,255,.03);
  border:1px solid var(--h-line);
  padding:4px 10px;
  border-radius:100px;
  font-weight:800;
}

.profile-bio{
  font-size:14px;
  color:var(--h-muted);
  line-height:1.6;
  margin-top:12px;
  max-width:560px;
  padding-bottom:20px;
}

.profile-name-row{
  display:flex;
  align-items:center;
  gap:12px;
}

.edit-profile-btn{
  width:36px;height:36px;
  display:flex;align-items:center;justify-content:center;
  border-radius:50%;
  text-decoration:none;
  font-size:18px;
  background:rgba(129,182,76,.08);
  border:1px solid rgba(129,182,76,.25);
  color:var(--h-green-2);
  transition:.25s;
}

.edit-profile-btn:hover{
  background:rgba(129,182,76,.18);
  transform:rotate(-10deg) scale(1.08);
  border-color:var(--h-green);
}

.profile-actions{
  display:flex;
  gap:10px;
  flex-wrap:wrap;
  margin-left:auto;
  align-self:flex-start;
  padding-top:8px;
}

.profile-tabs{
  display:flex;
  gap:0;
  border-top:1px solid var(--h-line);
  margin-top:4px;
}

.tab{
  padding:14px 20px;
  font-size:13px;
  font-weight:800;
  color:var(--h-muted);
  cursor:pointer;
  border-bottom:2px solid transparent;
  transition:all 0.2s;
  text-decoration:none;
}

.tab.active{
  color:var(--h-text);
  border-bottom-color:var(--h-green);
}

.tab:hover{
  color:var(--h-text);
}

/* Body */
.profile-body{
  max-width:1100px;
  margin:0 auto;
  padding:28px 24px 80px;
  display:grid;
  grid-template-columns:1fr 290px;
  gap:24px;
}

@media (max-width:900px){
  .profile-body{
    grid-template-columns:1fr;
  }
}

.sec-title{
  font-size:15px;
  font-weight:850;
  color:var(--h-text);
  margin-bottom:14px;
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.sec-title a{
  font-size:12px;
  color:var(--h-green-2);
  text-decoration:none;
  font-weight:800;
}

.sec-title a:hover{
  color:var(--h-green);
}

/* Ratings */
.ratings-grid{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:12px;
  margin-bottom:24px;
}

@media (max-width:560px){
  .ratings-grid{
    grid-template-columns:1fr;
  }
}

.rating-card{
  background:rgba(255,255,255,.045);
  border:1px solid rgba(255,255,255,.09);
  border-radius:14px;
  padding:20px 16px;
  transition:border-color 0.2s,transform 0.2s;
  position:relative;
  overflow:hidden;
}

.rating-card::before{
  content:'';
  position:absolute;
  top:0;left:0;right:0;
  height:2px;
  opacity:0;
  transition:opacity 0.2s;
  background:linear-gradient(90deg,var(--h-green-2),var(--h-green));
}

.rating-card:hover{
  border-color:rgba(129,182,76,.3);
  transform:translateY(-2px);
}

.rating-card:hover::before{
  opacity:1;
}

.rc-icon{
  font-size:18px;
  margin-bottom:10px;
}

.rc-mode{
  font-size:11px;
  color:var(--h-muted);
  text-transform:uppercase;
  letter-spacing:0.1em;
  font-weight:800;
  margin-bottom:4px;
}

.rc-val{
  font-size:30px;
  font-weight:900;
  margin-bottom:2px;
  color:#ffffff;
}

.rc-sub{
  font-size:11px;
  color:var(--h-muted);
}

/* Stats */
.stats-row{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:12px;
  margin-bottom:28px;
}

.stat-box{
  background:rgba(255,255,255,.045);
  border:1px solid rgba(255,255,255,.09);
  border-radius:12px;
  padding:16px;
  text-align:center;
}

.sb-val{
  font-size:26px;
  font-weight:900;
  color:#ffffff;
}

.sb-label{
  font-size:11px;
  color:var(--h-muted);
  text-transform:uppercase;
  letter-spacing:0.08em;
  margin-top:4px;
  font-weight:800;
}

/* Table */
.table-wrap{
  background:rgba(255,255,255,.045);
  border:1px solid rgba(255,255,255,.09);
  border-radius:14px;
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
  padding:11px 14px;
  font-size:11px;
  font-weight:800;
  text-transform:uppercase;
  letter-spacing:0.1em;
  color:var(--h-muted);
  text-align:left;
}

.profile-body td{
  padding:11px 14px;
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
  padding:2px 8px;
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
  padding:3px 10px;
  background:rgba(255,255,255,.03);
  border:1px solid var(--h-line);
  border-radius:6px;
  color:var(--h-muted);
  font-size:12px;
  text-decoration:none;
  transition:all 0.2s;
}

.btn-watch:hover{
  background:rgba(129,182,76,.12);
  border-color:rgba(129,182,76,.4);
  color:var(--h-green-2);
}

.empty-row{
  text-align:center;
  color:var(--h-muted);
  padding:32px !important;
}

/* Right column */
.right-col{
  display:flex;
  flex-direction:column;
  gap:16px;
}

.side-card{
  background:rgba(255,255,255,.045);
  border:1px solid rgba(255,255,255,.09);
  border-radius:16px;
  padding:20px;
}

.side-card-title{
  font-size:12px;
  font-weight:850;
  color:var(--h-text);
  margin-bottom:14px;
  text-transform:uppercase;
  letter-spacing:0.12em;
}

.info-row{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:7px 0;
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

/* Responsive */
@media (max-width:768px){
  .avatar-row{
    flex-direction:column;
    align-items:flex-start;
  }
  .profile-actions{
    margin-left:0;
    width:100%;
  }
  .profile-tabs{
    overflow-x:auto;
  }
  .tab{
    white-space:nowrap;
    padding:12px 14px;
    font-size:12px;
  }
  .ratings-grid{
    grid-template-columns:repeat(2,1fr) !important;
  }
  .stats-row{
    grid-template-columns:repeat(3,1fr);
  }
  .profile-body table{
    font-size:12px;
  }
  .profile-body th,
  .profile-body td{
    padding:8px 10px;
  }
}

@media (max-width:480px){
  .ratings-grid{
    grid-template-columns:1fr !important;
  }
  .profile-avatar{
    width:70px;height:70px;
    font-size:28px;
  }
  .profile-username{
    font-size:1.6rem;
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
      <main className="h-page" style={{ alignItems:'center', justifyContent:'center' }}>
        <div className="cm2-wrap" style={{ textAlign:'center' }}>
          <p style={{ color:'var(--h-green-2)', fontSize:16 }}>Loading profile...</p>
        </div>
      </main>
    );
  }

  if (error || !user) {
    return (
      <main className="h-page" style={{ alignItems:'center', justifyContent:'center' }}>
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
        {/* Banner */}
        <div className="profile-banner">
          <div className="banner-inner">
            <div className="avatar-row">
              <div className="profile-avatar">
                {user.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="profile-avatar-img" />
                ) : (
                  user.username?.charAt(0)?.toUpperCase()
                )}
              </div>
              <div className="avatar-info">
                <div className="profile-name-row">
                  <h1 className="profile-username">{user.username}</h1>
                  <Link to="/edit-profile" className="edit-profile-btn" title="Edit Profile">✏️</Link>
                </div>
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
              </div>
              <div className="profile-actions">
                <Link to="/play" className="cm2-btn cm2-btn-primary">Play</Link>
                <Link to="/settings" className="cm2-btn cm2-btn-secondary">Settings</Link>
                <button type="button" className="cm2-btn cm2-btn-danger" onClick={logout}>Logout</button>
              </div>
            </div>

            {user.bio && <p className="profile-bio">{user.bio}</p>}

            <div className="profile-tabs">
              <span className="tab active">Overview</span>
              <span className="tab" to="#games">
                Games
              </span>
              <Link className="tab" to="/friends">
                Friends
              </Link>
              <Link className="tab" to="/profile/status">
                Status
              </Link>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="profile-body">
          <div>
            <div className="sec-title" style={{ marginBottom: '14px' }}>Ratings</div>
            <div className="ratings-grid">
              <div className="rating-card rc-1">
                <div className="rc-icon">Rapid</div>
                <div className="rc-mode">Rapid</div>
                <div className="rc-val brass">{user.rapidRating || 1200}</div>
                <div className="rc-sub">Rating</div>
              </div>
              <div className="rating-card rc-2">
                <div className="rc-icon">Blitz</div>
                <div className="rc-mode">Blitz</div>
                <div className="rc-val sage">{user.blitzRating || 1200}</div>
                <div className="rc-sub">Rating</div>
              </div>
              <div className="rating-card rc-3">
                <div className="rc-icon">Bullet</div>
                <div className="rc-mode">Bullet</div>
                <div className="rc-val rust">{user.bulletRating || 1200}</div>
                <div className="rc-sub">Rating</div>
              </div>
            </div>

            <div className="stats-row">
              <div className="stat-box">
                <div className="sb-val green">{user.wins || 0}</div>
                <div className="sb-label">Wins</div>
              </div>
              <div className="stat-box">
                <div className="sb-val red">{user.losses || 0}</div>
                <div className="sb-label">Losses</div>
              </div>
              <div className="stat-box">
                <div className="sb-val gray">{user.draws || 0}</div>
                <div className="sb-label">Draws</div>
              </div>
            </div>

            <div id="games">
              <div className="sec-title">Recent Games</div>
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
              <Link to="/settings" style={{ display: 'block', textAlign: 'center', fontSize: '12px', color: 'var(--h-green-2)', textDecoration: 'none' }}>
                Change theme →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
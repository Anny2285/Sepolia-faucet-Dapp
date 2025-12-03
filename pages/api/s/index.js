import { useState } from 'react';

export default function Home() {
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');

  const getEth = async () => {
    setStatus('Sending 0.2 Sepolia ETH...');
    try {
      const res = await fetch('/api/faucet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address })
      });
      const data = await res.json();
      setStatus(data.success ? `Sent! Tx: ${data.hash}` : data.error || 'Failed');
    } catch (err) {
      setStatus('Network error');
    }
  };

  return (
    <div style={{textAlign:'center', padding:'80px 20px', fontFamily:'system-ui', maxWidth:'500px', margin:'0 auto'}}>
      <h1>Sepolia Faucet – 0.2 ETH</h1>
      <p>No login • No tweets • No captcha • Instant</p>
      <input
        placeholder="0x..."
        value={address}
        onChange={e => setAddress(e.target.value)}
        style={{width:'100%', padding:'16px', fontSize:'18px', margin:'20px 0', borderRadius:'12px', border:'2px solid #333'}}
      />
      <br/>
      <button
        onClick={getEth}
        style={{padding:'18px 50px', fontSize:'20px', background:'#0066ff', color:'white', border:'none', borderRadius:'12px', cursor:'pointer'}}
      >
        Get 0.2 Sepolia ETH
      </button>
      <p style={{marginTop:'30px', fontWeight:'bold', minHeight:'30px', color: status.includes('Sent') ? 'green' : 'inherit'}}>
        {status}
      </p>
    </div>
  );
}

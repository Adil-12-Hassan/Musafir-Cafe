import { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

interface Props {
  order: {
    orderId: string;
    customerName: string;
    items: { name: string; size: string; price: number; quantity: number }[];
    total: number;
    createdAt: string;
  };
}

export default function Receipt({ order }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    setTimeout(async () => {
      const canvas = await html2canvas(ref.current!, { scale: 2, backgroundColor: '#faf9f7' });
      const link = document.createElement('a');
      link.download = `${order.orderId}-receipt.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }, 500);
  }, []);

  const date = new Date(order.createdAt).toLocaleString('en-PK', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed', left: '-9999px', top: 0,
        width: '360px', background: '#faf9f7',
        fontFamily: 'Georgia, serif', padding: '32px 28px',
        border: '1px solid #e0dbd5',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', borderBottom: '1px solid #e0dbd5', paddingBottom: '16px', marginBottom: '16px' }}>
        <div style={{ fontSize: '28px', marginBottom: '4px' }}>☕</div>
        <div style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '-0.5px' }}>Musafir Cafe</div>
        <div style={{ fontSize: '11px', color: '#6b6560', marginTop: '4px' }}>Jinnah Colony, Faisalabad</div>
        <div style={{ fontSize: '11px', color: '#6b6560' }}>03090169035</div>
      </div>

      {/* Order ID */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', color: '#6b6560', letterSpacing: '2px', textTransform: 'uppercase' }}>Order ID</div>
        <div style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '2px', color: '#3d2b1f' }}>{order.orderId}</div>
        <div style={{ fontSize: '11px', color: '#6b6560', marginTop: '4px' }}>{date}</div>
      </div>

      <div style={{ borderTop: '1px dashed #e0dbd5', marginBottom: '12px' }} />

      {/* Items */}
      <div style={{ marginBottom: '12px' }}>
        {order.items.map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px' }}>
            <span>{item.name} <span style={{ color: '#6b6560', fontSize: '11px' }}>({item.size}) ×{item.quantity}</span></span>
            <span style={{ fontWeight: 600 }}>Rs {item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px dashed #e0dbd5', marginBottom: '12px' }} />

      {/* Total */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '15px', marginBottom: '20px' }}>
        <span>TOTAL</span>
        <span>Rs {order.total}</span>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', borderTop: '1px solid #e0dbd5', paddingTop: '16px' }}>
        <div style={{ fontSize: '11px', color: '#6b6560', fontStyle: 'italic', lineHeight: 1.8 }}>
          "Keep moving. Keep growing.<br />Your journey is yours."
        </div>
        <div style={{ fontSize: '10px', color: '#9a9089', marginTop: '8px', letterSpacing: '1px' }}>
          TRACK AT musafircafe.com/track
        </div>
        <div style={{ fontSize: '11px', color: '#3d2b1f', marginTop: '4px', fontWeight: 600 }}>
          Thank you, {order.customerName}!
        </div>
      </div>
    </div>
  );
}

import { useEffect } from 'react';
import { BroadcastMessage } from '../types';

export function useBroadcastState(channelName: string, onRequestState: () => void, onMessage?: (msg: BroadcastMessage) => void) {
  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    try { channel = new BroadcastChannel(channelName); } catch (e) { channel = null; }

    const handler = (ev: MessageEvent<BroadcastMessage>) => {
      if (ev.data.type === 'REQUEST_STATE') onRequestState();
      if (onMessage) onMessage(ev.data);
    };

    if (channel) channel.onmessage = handler;
    return () => { if (channel) channel.onmessage = null; };
  }, [channelName, onRequestState, onMessage]);
}

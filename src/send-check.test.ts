import { afterEach, describe, expect, it, vi } from 'vitest';
import { SendError, WEB3FORMS_ENDPOINT, sendCheck } from './send-check';

const req = {
  business: 'Harbor Street Bakery',
  location: 'Lisbon',
  website: '',
  reach: 'owner@example.com',
  note: '',
};

afterEach(() => vi.unstubAllGlobals());

describe('sendCheck', () => {
  it('posts the request to Web3Forms with the access key and reply-to address', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{"success":true}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await sendCheck(req, false, 'test-key');

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(WEB3FORMS_ENDPOINT);
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({
      access_key: 'test-key',
      subject: 'Free online checkup: Harbor Street Bakery',
      replyto: 'owner@example.com',
      business: 'Harbor Street Bakery',
      website: 'none',
      botcheck: false,
    });
  });

  it('leaves reply-to out when the visitor gave a phone number', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    await sendCheck({ ...req, reach: '+1 707 555 0100' }, false, 'k');
    expect(JSON.parse(fetchMock.mock.calls[0][1].body).replyto).toBeUndefined();
  });

  it('fails clearly when no key is configured', async () => {
    await expect(sendCheck(req, false, '')).rejects.toThrow('not set up');
  });

  it('passes on the server message when the send is rejected', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response('{"message":"Invalid access key"}', { status: 400 })),
    );
    await expect(sendCheck(req, false, 'k')).rejects.toThrow('Invalid access key');
  });

  it('reports network failures as a SendError', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('offline')));
    await expect(sendCheck(req, false, 'k')).rejects.toBeInstanceOf(SendError);
  });
});

// AUTO-GENERATED from the reference markup. Do not edit by hand.
import { Fragment } from 'react'
import { css, arr } from '../lib/css.js'

export default function Template({ vals }) {
  return (
    <>


<div className="rasa-stage" style={css(`min-height:100vh;display:flex;align-items:flex-start;justify-content:center;gap:44px;padding:48px 40px 64px`)}>

  
  <aside className="rasa-rail" style={css(`width:248px;flex-shrink:0;position:sticky;top:48px`)}>
    <div style={css(`display:flex;align-items:center;gap:10px;margin-bottom:6px`)}>
      <div style={css(`width:34px;height:34px;border-radius:10px;background:var(--p,#7D1535);color:#fff;display:flex;align-items:center;justify-content:center;font:700 18px var(--display,'Space Grotesk')`)}>R</div>
      <div style={css(`font:700 22px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.5px`)}>rasa</div>
    </div>
    <div style={css(`font:500 12.5px 'Inter';color:#857E91;margin-bottom:24px;padding-left:2px`)}>Skip the queue. Order ahead.</div>
    { arr(vals.navGroups).map((grp, _k0) => ( <Fragment key={_k0}>
      <div style={css(`margin-bottom:18px`)}>
        <div style={css(`font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1.5px;text-transform:uppercase;color:#A39BB0;padding:0 8px 8px`)}>{grp.label}</div>
        { arr(grp.items).map((it, _k1) => ( <Fragment key={_k1}>
          <button onClick={it.onClick} style={css(`${it.rowStyle}`)}>
            <span style={css(`font:600 10px 'JetBrains Mono',monospace;opacity:.55;width:16px;text-align:right`)}>{it.num}</span>
            <span>{it.label}</span>
          </button>
        </Fragment> )) }
      </div>
    </Fragment> )) }
  </aside>

  
  <main className="rasa-main" style={css(`display:flex;flex-direction:column;align-items:center`)}>
    <div style={css(`display:inline-flex;align-items:center;gap:8px;background:#fff;border:1px solid #E4DDD0;border-radius:999px;padding:6px 14px 6px 8px;margin-bottom:18px;box-shadow:0 1px 2px rgba(60,40,20,.04)`)}>
      <span style={css(`width:8px;height:8px;border-radius:50%;background:var(--p,#7D1535)`)}></span>
      <span style={css(`font:600 12px 'Inter';color:#5A5368`)}>{vals.screenName}</span>
    </div>

    
    <div style={css(`width:392px;height:844px;background:#161320;border-radius:56px;padding:11px;box-shadow:0 40px 80px -30px rgba(40,25,60,.55),0 0 0 1px rgba(0,0,0,.04)`)}>
      <div style={css(`width:100%;height:100%;background:#FAF6F3;border-radius:46px;overflow:hidden;position:relative;display:flex;flex-direction:column`)}>

        
        <div style={css(`height:46px;flex-shrink:0;display:flex;align-items:center;justify-content:space-between;padding:0 28px;position:relative;z-index:60;background:transparent`)}>
          <span style={css(`font:600 14px 'Inter';color:#1F1A2E`)}>9:41</span>
          <div style={css(`position:absolute;left:50%;top:9px;transform:translateX(-50%);width:104px;height:26px;background:#161320;border-radius:999px`)}></div>
          <div style={css(`display:flex;align-items:center;gap:6px;color:#1F1A2E`)}>
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none"><rect x="0" y="7" width="3" height="5" rx="1" fill="currentColor"></rect><rect x="4.5" y="4.5" width="3" height="7.5" rx="1" fill="currentColor"></rect><rect x="9" y="2" width="3" height="10" rx="1" fill="currentColor"></rect><rect x="13.5" y="0" width="3" height="12" rx="1" fill="currentColor" opacity=".35"></rect></svg>
            <svg width="22" height="12" viewBox="0 0 22 12" fill="none"><rect x="0.5" y="0.5" width="18" height="11" rx="3" stroke="currentColor" opacity=".4"></rect><rect x="2" y="2" width="14" height="8" rx="1.5" fill="currentColor"></rect><rect x="19.5" y="4" width="1.5" height="4" rx="1" fill="currentColor" opacity=".5"></rect></svg>
          </div>
        </div>

        
        <div className="scr" style={css(`flex:1;overflow-y:auto;overflow-x:hidden;position:relative`)}>

          
          { (vals.isHome) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;padding-bottom:28px`)}>
            <div style={css(`display:flex;align-items:center;justify-content:space-between;padding:6px 22px 14px`)}>
              <button onClick={vals.goLocation} style={css(`background:none;border:none;padding:0;cursor:pointer;text-align:left`)}>
                <div style={css(`font:600 10px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase`)}>Delivering to</div>
                <div style={css(`display:flex;align-items:center;gap:5px;margin-top:3px`)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="2.6"></circle></svg>
                  <span style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630`)}>{vals.location}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m6 9 6 6 6-6"></path></svg>
                </div>
              </button>
              <button onClick={vals.goProfile} aria-label="Profile" style={css(`width:42px;height:42px;border-radius:50%;border:2px solid #fff;box-shadow:0 2px 6px rgba(60,40,20,.12);padding:0;cursor:pointer;flex-shrink:0;background:#EEE9E0 center/cover no-repeat;background-image:url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gxYSUNDX1BST0ZJTEUAAQEAAAxITGlubwIQAABtbnRyUkdCIFhZWiAHzgACAAkABgAxAABhY3NwTVNGVAAAAABJRUMgc1JHQgAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLUhQICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFjcHJ0AAABUAAAADNkZXNjAAABhAAAAGx3dHB0AAAB8AAAABRia3B0AAACBAAAABRyWFlaAAACGAAAABRnWFlaAAACLAAAABRiWFlaAAACQAAAABRkbW5kAAACVAAAAHBkbWRkAAACxAAAAIh2dWVkAAADTAAAAIZ2aWV3AAAD1AAAACRsdW1pAAAD+AAAABRtZWFzAAAEDAAAACR0ZWNoAAAEMAAAAAxyVFJDAAAEPAAACAxnVFJDAAAEPAAACAxiVFJDAAAEPAAACAx0ZXh0AAAAAENvcHlyaWdodCAoYykgMTk5OCBIZXdsZXR0LVBhY2thcmQgQ29tcGFueQAAZGVzYwAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAPNRAAEAAAABFsxYWVogAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z2Rlc2MAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZXNjAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAsUmVmZXJlbmNlIFZpZXdpbmcgQ29uZGl0aW9uIGluIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHZpZXcAAAAAABOk/gAUXy4AEM8UAAPtzAAEEwsAA1yeAAAAAVhZWiAAAAAAAEwJVgBQAAAAVx/nbWVhcwAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAo8AAAACc2lnIAAAAABDUlQgY3VydgAAAAAAAAQAAAAABQAKAA8AFAAZAB4AIwAoAC0AMgA3ADsAQABFAEoATwBUAFkAXgBjAGgAbQByAHcAfACBAIYAiwCQAJUAmgCfAKQAqQCuALIAtwC8AMEAxgDLANAA1QDbAOAA5QDrAPAA9gD7AQEBBwENARMBGQEfASUBKwEyATgBPgFFAUwBUgFZAWABZwFuAXUBfAGDAYsBkgGaAaEBqQGxAbkBwQHJAdEB2QHhAekB8gH6AgMCDAIUAh0CJgIvAjgCQQJLAlQCXQJnAnECegKEAo4CmAKiAqwCtgLBAssC1QLgAusC9QMAAwsDFgMhAy0DOANDA08DWgNmA3IDfgOKA5YDogOuA7oDxwPTA+AD7AP5BAYEEwQgBC0EOwRIBFUEYwRxBH4EjASaBKgEtgTEBNME4QTwBP4FDQUcBSsFOgVJBVgFZwV3BYYFlgWmBbUFxQXVBeUF9gYGBhYGJwY3BkgGWQZqBnsGjAadBq8GwAbRBuMG9QcHBxkHKwc9B08HYQd0B4YHmQesB78H0gflB/gICwgfCDIIRghaCG4IggiWCKoIvgjSCOcI+wkQCSUJOglPCWQJeQmPCaQJugnPCeUJ+woRCicKPQpUCmoKgQqYCq4KxQrcCvMLCwsiCzkLUQtpC4ALmAuwC8gL4Qv5DBIMKgxDDFwMdQyODKcMwAzZDPMNDQ0mDUANWg10DY4NqQ3DDd4N+A4TDi4OSQ5kDn8Omw62DtIO7g8JDyUPQQ9eD3oPlg+zD88P7BAJECYQQxBhEH4QmxC5ENcQ9RETETERTxFtEYwRqhHJEegSBxImEkUSZBKEEqMSwxLjEwMTIxNDE2MTgxOkE8UT5RQGFCcUSRRqFIsUrRTOFPAVEhU0FVYVeBWbFb0V4BYDFiYWSRZsFo8WshbWFvoXHRdBF2UXiReuF9IX9xgbGEAYZRiKGK8Y1Rj6GSAZRRlrGZEZtxndGgQaKhpRGncanhrFGuwbFBs7G2MbihuyG9ocAhwqHFIcexyjHMwc9R0eHUcdcB2ZHcMd7B4WHkAeah6UHr4e6R8THz4faR+UH78f6iAVIEEgbCCYIMQg8CEcIUghdSGhIc4h+yInIlUigiKvIt0jCiM4I2YjlCPCI/AkHyRNJHwkqyTaJQklOCVoJZclxyX3JicmVyaHJrcm6CcYJ0kneierJ9woDSg/KHEooijUKQYpOClrKZ0p0CoCKjUqaCqbKs8rAis2K2krnSvRLAUsOSxuLKIs1y0MLUEtdi2rLeEuFi5MLoIuty7uLyQvWi+RL8cv/jA1MGwwpDDbMRIxSjGCMbox8jIqMmMymzLUMw0zRjN/M7gz8TQrNGU0njTYNRM1TTWHNcI1/TY3NnI2rjbpNyQ3YDecN9c4FDhQOIw4yDkFOUI5fzm8Ofk6Njp0OrI67zstO2s7qjvoPCc8ZTykPOM9Ij1hPaE94D4gPmA+oD7gPyE/YT+iP+JAI0BkQKZA50EpQWpBrEHuQjBCckK1QvdDOkN9Q8BEA0RHRIpEzkUSRVVFmkXeRiJGZ0arRvBHNUd7R8BIBUhLSJFI10kdSWNJqUnwSjdKfUrESwxLU0uaS+JMKkxyTLpNAk1KTZNN3E4lTm5Ot08AT0lPk0/dUCdQcVC7UQZRUFGbUeZSMVJ8UsdTE1NfU6pT9lRCVI9U21UoVXVVwlYPVlxWqVb3V0RXklfgWC9YfVjLWRpZaVm4WgdaVlqmWvVbRVuVW+VcNVyGXNZdJ114XcleGl5sXr1fD19hX7NgBWBXYKpg/GFPYaJh9WJJYpxi8GNDY5dj62RAZJRk6WU9ZZJl52Y9ZpJm6Gc9Z5Nn6Wg/aJZo7GlDaZpp8WpIap9q92tPa6dr/2xXbK9tCG1gbbluEm5rbsRvHm94b9FwK3CGcOBxOnGVcfByS3KmcwFzXXO4dBR0cHTMdSh1hXXhdj52m3b4d1Z3s3gReG54zHkqeYl553pGeqV7BHtje8J8IXyBfOF9QX2hfgF+Yn7CfyN/hH/lgEeAqIEKgWuBzYIwgpKC9INXg7qEHYSAhOOFR4Wrhg6GcobXhzuHn4gEiGmIzokziZmJ/opkisqLMIuWi/yMY4zKjTGNmI3/jmaOzo82j56QBpBukNaRP5GokhGSepLjk02TtpQglIqU9JVflcmWNJaflwqXdZfgmEyYuJkkmZCZ/JpomtWbQpuvnByciZz3nWSd0p5Anq6fHZ+Ln/qgaaDYoUehtqImopajBqN2o+akVqTHpTilqaYapoum/adup+CoUqjEqTepqaocqo+rAqt1q+msXKzQrUStuK4trqGvFq+LsACwdbDqsWCx1rJLssKzOLOutCW0nLUTtYq2AbZ5tvC3aLfguFm40blKucK6O7q1uy67p7whvJu9Fb2Pvgq+hL7/v3q/9cBwwOzBZ8Hjwl/C28NYw9TEUcTOxUvFyMZGxsPHQce/yD3IvMk6ybnKOMq3yzbLtsw1zLXNNc21zjbOts83z7jQOdC60TzRvtI/0sHTRNPG1EnUy9VO1dHWVdbY11zX4Nhk2OjZbNnx2nba+9uA3AXcit0Q3ZbeHN6i3ynfr+A24L3hROHM4lPi2+Nj4+vkc+T85YTmDeaW5x/nqegy6LzpRunQ6lvq5etw6/vshu0R7ZzuKO6070DvzPBY8OXxcvH/8ozzGfOn9DT0wvVQ9d72bfb794r4Gfio+Tj5x/pX+uf7d/wH/Jj9Kf26/kv+3P9t////2wCEAAIDAwMEAwQFBQQGBgYGBggIBwcICA0JCgkKCQ0TDA4MDA4MExEUEQ8RFBEeGBUVGB4jHRwdIyolJSo1MjVFRVwBAgMDAwQDBAUFBAYGBgYGCAgHBwgIDQkKCQoJDRMMDgwMDgwTERQRDxEUER4YFRUYHiMdHB0jKiUlKjUyNUVFXP/AABEIAHgAeAMBIgACEQEDEQH/xACXAAABBAMBAQAAAAAAAAAAAAAEAAMFCQYHCAIBEAACAgEDAgQDBgUEAwAAAAABAgADBAUGERIxBxMhQSJhcRQVMlGRoQgjQlKCJTRUcoGSkwEAAQUBAQEAAAAAAAAAAAAABQIDBAYHAAEIEQACAgICAQIGAQIHAAAAAAABAgADBBESIQUxQQYTIlFhcQcUFTIzQlJikcH/2gAMAwEAAhEDEQA/ANiKkKVI+qQxUmx8IjcHWuOiuGrXHwkQVncpHCuLy5KiuYduncmkbb0XI1HPt6Kqx6KPVnY9lUe5MZcKFJPQEVuTXlyByNV0eiwJdqGNWx7K9qqf3Mqy3p4t7x3Fc6Je+BiNyUoqZl4T2NrrwSZzeKftNtisiWORz1dP4j8+8h281I0Bs+gJkT+rQ70Doe8vdwtT0nOLDFzse8r3FVquR+hko1ZlGWFj6niZFd2LbZVYoIV0JRl+XIm3MPxM35gPV/q96LwPhfhxwPYBgYMbOaokWUHr/adyahVwCG9ZbOyQcrOZvDjxixdezqtL1FEozbAfJccqtxHtwezTqpkhvGtpvrD1nYiH5KdGQxWDskl2SCskmfLjXKQ7JFDGWKINUVymZKkNVJ6RYcqQhxjG4yEjwSFKkfCRorPeUECSpLxx3oNa3acRGL4mnM1aKOzW9maWsbizhpu39UzeP9vi22f+qkyhPJst89rbOXtsbn6s3qT9SYCzrillKgb2dmO63U/eoc9We7LTSebG4Lke3PtOh9pbArfptyj1H2Wfdr7c+zYSXXcPkXsGdvyHfgTfukDosXiX3E8C2Stt1jkcEBVWPoTKBZ5VKrqKgmxY5B0PYSQw9naX1Dmhf0g24/DfTNTwiqUhGA9CBNxYi89M2VpuNS7DqmNecpsW135EMvoZt3i1pakLwBUjsSnjV9t5uj5wpYNXajh8W5PQo6nkMPofaW6ba1I6rt7TM08dV+Ojvx/dx8X7zUPiTszF1DAynRP5lKGxP8e88+BOqPnbH8l25fDy7qmP1PWJ58NZ7ZGU4YAMykMB0Cy+hg3ymGuOo4747+n8A+06BZII6SadIIyTUxXKtzkG6RQ9kinfKncpmCJDVSfEWGqs94ztzyEhCrHFWPhYgrO3NFeMOU2L4ba8693pWv8A+jBZS9hY+Tlazj1ovxvYAJeV4jadh5+ztRx8lGap/L5CkqeQ4I9RKvdK2vlYO9uop/JDuKmJ5JX2kE+OvuyqbvSsOiE/YnZkPJy0Ss1f62RmA/Wh/wCzbj1DHTHp+JnNZ4AHJJMNo1O7CYGzTMoqD+NVDCe9XrzSzrjMqvwvxEcwDR9M3FXl5Nt+fa1H2c+UPQcW/mw91l8z8rMw8FzVUzE2r9ipBGpWcHExsjNTm2itZ/YIOzOgtC1HDzqA1ZPPYhhwQZlWVr+FpDBbqrrG456K06jNIbb1G06vT5nuyggduZtPxJfcB5Gm1Lyyk9X5cdhMs+KMezGu8dS4TnmIW2fRfxNO+H8+vKx8yyvlrGsNfXq2veHvuGnPVXbAyqKbQ1fmWpwvLDsfymBeBmntRt7VbejhbtRs6PmEAWEbYo3qPu6nLsFmO1XVkhk6elz6cD8xN3bN0mvTdtYdCjuGsb62EsZUfhTFX+75OiNIu/8AvqGPOWscOkkEbPvMmZIIySYZYIyzbRXM95SFZIoa6xT35c7lMpRYcqxpBDVWQdSTue1WPhZ9VY+BGys7cx/WcL7XpObRxyXqbj6gcicCUYrjKqNncNLIQJy94gbaTCLaljcKnWHvU9lHPxEQ1g5eNTRel3LidFdDf1CA87Dvuvx7KtckJDbOtqfWaloxqGzXFhI+H0+sPzGC0lQvxdoJcpJLCH13ULiOzgF2HAlxsqFuLpaeVquNAe/L7wFVeEsYtaErZDsn2KzF9GoJzaiB+F+efpOyDQllSeco6uB+hnJmiaZVbqNV73MBQh6FDEAjnk+nYmdS4ekVNTaasy4i2zzh5jlukn+kc9lmCfyjbc+bgcAA1RPYbpftNQ/j7GSnxt+96sYHZHbddmZDXp9dWNa7n0CAr/4nrHq6MaleOOEE82M9oSnnlV4r+vPqZMMsjfBtT2vm5JUAMVQEe5Xswx8TWKv9PSD2AWP6PQkSywNlkuywNxNdCTPdyHdYoQ6xT3hPOUyVBDlEFQQ5BAREJGEKI8BPKx8CIiIgJiu6NAo13b2p6ZaxVMvHeosO46xxzMwAnqNsoZSpGwRoxe5X++LlYSHFyiPtFKqt3HYsB6kfIzHMl7GTpQ8H2PfgzO99Fm3NnGs+os4/aa2pyAbelwVYTUkqcYuPZs8TUNnvr96mRnNqbNycdgAy3MF3rv8AW+tzI8PBtZ62Oe3UvB5av0HynQWj4mXT5Rq1I3VlfjQpwOfkZhW3MrD+EW9J4PYzf2KleSy+VX5accc8cenynyj8Z1nK8nXj0NW72PxUAnvf5Jn1R4K8U+KD2LxVV2x0N9fqSWLSvAYdl5A+ZPcw5lh4RUQKo4AHAEHcTY/DePTA8fRjjvgv1H7sfUzM/IZbZWVZaeuR6H2HtI1hAnEkmECcSyAQRuRbiKOOIo5qJk+kOSR6Q9JVoahqwkQMuqIWZgqgckk8ATlXe/8AELsbbyPVh3jVc0Er5WO3KIR/fZ2EbZ1UdmNEgTrW26mmprLbFRFHLMx4A+pM5O3z487b0PUqsDDZM2xgRffW4ZMf8ueO5lam/vF7eW8l8nMvSjD55GJj8qn+Z7vNHU3dC9PtI6XqzA+0g23nRC9f8pZcmr0ZuQl4uFgsPV1889XMyL7vWzKrcD0lYmLqudinnHyrKvkrED9JnmH4k71xeOjU2bj2dFaXlviKoY4QUlTxI6OxM9x/BsmSz23CxTYHB1phLo9v4tC4iHoBImNb731RtTBozXRbA19VZq/qZWbhivzA9ZWPj+NniOtXQupVIPlQk1lrO5dc1jJF2oahbkuPw9Z9F+gHAE+Xc7xmanmhm1OFIfkNDZn0bX5fEfx5o4MdpxO+hL1NF3DoutYovwM2rITgE9DAlfkRJ15Qlt3c+s6BnnM07MfHvI4LD1DD8mB9DOxtvfxN51Yrr1jSVuHZr8ZulvqUabFgedqdAMhflv8AjtZQ7sYg/QdiWMuIE80hoHjT4da06116umNcx4FWUDSSfkW9DN3LZXYgdHV1PZlPIMudN9No2lisPwYLYMPUQFxFPVkUlxIkkhnIu/P4iNtaBfbh6ZT965icq5R+mith7M/ufpMJ8ePFP7vxH2/pWVxl3rxm2ofWms/0A+ztKwbKggXjtx6cSkWWEKSJPuu0dL6zbm8vFTe+62ddQ1Nlxj2xKOaqQPmB6t/lNNDgT77T6ILezXZg3Tu3Z2Z65inmfY4HVhEcSDPgMeDHmMiPrEO/U5VJ1JKqwwwcE8kyLHoIQHMA3ne+4bp61DyYzY08Bow5MFKvYk8t9MaB5PE2Ptze259u3K2nandSqkfyurqqPyKH0mtk/HHckcGOcytq6Yq2uiDoxAH0E695c14aeINe7tFe2ypasughb0Xseezr8jFOCfBPc6aPu7Gqus6aM5PIYnsG7pFNP8H5I5WFuxx8ytije29ehgzKoKWdA6IBE0DuzU/vPcWqah/ycu6wf9WY9P7TCurkGKKDLvRh+JAXvv7mMT4IooLYbqix089mKKKQaWOiJLtQAgxCOL3iii2cxkKIT6cR0RRSC8nDrUeXtGX4iikL3ks/4J5p/GITkCKKQLCRkpHk/wAlpI13tTbRYvepkcfVeCIoopXTbYjvxYjZhTgpA2J//9k=)`)}></button>
            </div>

            
            <div style={css(`display:flex;justify-content:flex-end;gap:8px;padding:0 22px 12px`)}>
              <div style={css(`position:relative`)}>
                <button onClick={vals.dietBtn.onToggle} style={css(`${vals.dietBtn.btnStyle}`)}>
                  { (vals.dietBtn.showDot) ? ( <><span style={css(`${vals.dietBtn.dotStyle}`)}><span style={css(`${vals.dietBtn.dotInner}`)}></span></span></> ) : null}
                  { (vals.dietBtn.isAll) ? ( <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 5h18M6 12h12M10 19h4"></path></svg></> ) : null}
                  {vals.dietBtn.label}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" style={css(`transform:${vals.dietBtn.chevron};transition:transform .15s`)}><path d="m6 9 6 6 6-6"></path></svg>
                </button>
                { (vals.dietBtn.open) ? ( <>
                  <div style={css(`position:absolute;right:0;top:40px;width:170px;background:#fff;border:1px solid #ECE6DB;border-radius:13px;box-shadow:0 12px 30px -10px rgba(60,40,20,.35);overflow:hidden;z-index:50`)}>
                    <div style={css(`font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.6px;padding:10px 13px 5px`)}>Show</div>
                    { arr(vals.dietMenu).map((dm, _k2) => ( <Fragment key={_k2}>
                      <button onClick={dm.onClick} style={css(`${dm.rowStyle}`)}>
                        { (dm.showDot) ? ( <><span style={css(`${dm.dotStyle}`)}><span style={css(`${dm.dotInner}`)}></span></span></> ) : null}
                        { (dm.isAll) ? ( <><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 5h18M6 12h12M10 19h4"></path></svg></> ) : null}
                        <span style={css(`flex:1`)}>{dm.label}</span>
                        { (dm.active) ? ( <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.6"><path d="m5 12 5 5 9-10"></path></svg></> ) : null}
                      </button>
                    </Fragment> )) }
                  </div>
                </> ) : null}
              </div>
            </div>

            
            <div style={css(`padding:0 22px`)}>
              <button onClick={vals.openSearch} style={css(`width:100%;display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:13px 15px;cursor:pointer;text-align:left`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B0A9BC" strokeWidth="2.2"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4-4"></path></svg>
                <span style={css(`font:500 13.5px 'Inter';color:#A39BB0`)}>Search vendors, dishes…</span>
              </button>
            </div>

            
            <div style={css(`padding:18px 22px 0`)}>
              <div style={css(`position:relative;background:linear-gradient(135deg,var(--p,#7D1535),var(--p2,#9E2A48));border-radius:24px;padding:22px;overflow:hidden`)}>
                <div style={css(`position:absolute;right:-30px;top:-30px;width:130px;height:130px;border-radius:50%;background:rgba(255,255,255,.08)`)}></div>
                <div style={css(`position:absolute;left:-20px;bottom:-40px;width:120px;height:120px;border-radius:50%;background:rgba(0,0,0,.10)`)}></div>
                <div style={css(`position:relative`)}>
                  <div style={css(`display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.18);border-radius:999px;padding:5px 11px;font:600 10px 'JetBrains Mono',monospace;letter-spacing:.5px;color:#fff;text-transform:uppercase`)}>First order</div>
                  <div style={css(`font:700 23px var(--display,'Space Grotesk');color:#fff;line-height:1.15;margin-top:12px;max-width:230px;letter-spacing:-.3px`)}>20% off your first order.</div>
                  <button onClick={vals.openArtiste} style={css(`margin-top:16px;background:#fff;color:var(--p,#7D1535);border:none;border-radius:999px;padding:10px 18px;font:700 12.5px 'Inter';cursor:pointer;display:inline-flex;align-items:center;gap:6px`)}>Order ahead <span style={css(`font-size:14px`)}>→</span></button>
                </div>
              </div>
            </div>

            
            <div style={css(`padding:26px 0 0`)}>
              <div style={css(`display:flex;align-items:baseline;justify-content:space-between;margin-bottom:14px;padding:0 22px`)}>
                <div style={css(`font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px`)}>Bangalore food streets</div>
                <span style={css(`font:600 12px 'Inter';color:var(--p,#7D1535)`)}>See all</span>
              </div>
              <div className="scr" ref={vals.dragScroll} style={css(`display:flex;gap:11px;overflow-x:auto;scroll-snap-type:x proximity;-webkit-overflow-scrolling:touch;padding:0 22px 4px;cursor:grab;scroll-behavior:smooth`)}>
                { arr(vals.streets).map((st, _k3) => ( <Fragment key={_k3}>
                  <button onClick={st.onClick} aria-label={st.ariaLabel} style={css(`scroll-snap-align:start;flex-shrink:0;width:126px;text-align:left;padding:0;border:none;background:none;cursor:pointer`)}>
                    <div style={css(`position:relative;height:150px;border-radius:16px;overflow:hidden;background:#EEE9E0;box-shadow:0 5px 15px -9px rgba(40,25,60,.45)`)}>
                      <div style={css(`position:absolute;inset:0;background:#EEE9E0 center/cover no-repeat;background-image:url(${st.img})`)}></div>
                      <div style={css(`position:absolute;inset:0;background:linear-gradient(to top,rgba(20,14,26,.86) 0%,rgba(20,14,26,.28) 46%,rgba(20,14,26,.14) 100%)`)}></div>
                      
                      <div style={css(`position:absolute;top:9px;left:9px;width:27px;height:27px;border-radius:50%;background:rgba(255,255,255,.15);backdrop-filter:blur(4px);border:1px solid rgba(255,255,255,.36);display:flex;align-items:center;justify-content:center`)}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={st.icon}></path></svg>
                      </div>
                      
                      <div style={css(`position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none`)}>
                        <span style={css(`font:700 7.5px 'JetBrains Mono',monospace;letter-spacing:1px;text-transform:uppercase;color:#fff;background:rgba(255,255,255,.15);backdrop-filter:blur(3px);border:1px solid rgba(255,255,255,.3);padding:5px 10px;border-radius:999px`)}>Coming soon</span>
                      </div>
                      <div style={css(`position:absolute;left:11px;right:11px;bottom:11px`)}>
                        <div style={css(`font:700 12px var(--display,'Space Grotesk');color:#fff;line-height:1.18;letter-spacing:-.2px;text-shadow:0 1px 6px rgba(0,0,0,.45)`)}>{st.name}</div>
                        <div style={css(`font:500 9.5px 'Inter';color:rgba(255,255,255,.78);margin-top:4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>{st.area}</div>
                      </div>
                    </div>
                  </button>
                </Fragment> )) }
              </div>
            </div>

            
            <div style={css(`display:flex;gap:9px;overflow-x:auto;padding:18px 22px 0`)} className="scr">
              { arr(vals.categories).map((c, _k4) => ( <Fragment key={_k4}>
                <button onClick={c.onClick} style={css(`flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:7px;width:62px;background:none;border:none;padding:0;cursor:pointer`)}>
                  <div style={css(`${c.ringStyle}`)}></div>
                  <span style={css(`${c.labelStyle}`)}>{c.name}</span>
                </button>
              </Fragment> )) }
            </div>

            
            <div style={css(`padding:24px 22px 0`)}>
              <div style={css(`display:flex;align-items:baseline;justify-content:space-between;margin-bottom:14px`)}>
                <div style={css(`font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px`)}>Order ahead, skip the wait</div>
                <span style={css(`font:600 12px 'Inter';color:var(--p,#7D1535)`)}>See all</span>
              </div>
              <div className="scr" ref={vals.dragScroll} style={css(`display:flex;gap:14px;overflow-x:auto;margin:0 -22px;padding:0 22px 4px;cursor:grab;scroll-behavior:smooth`)}>
              { arr(vals.homeVendors).map((vd, _k5) => ( <Fragment key={_k5}>
                <button onClick={vd.onClick} style={css(`width:270px;flex-shrink:0;text-align:left;padding:0;border:1px solid #ECE6DB;background:#fff;border-radius:var(--radXL,22px);overflow:hidden;cursor:pointer`)}>
                  <div style={css(`position:relative;height:148px;overflow:hidden;background:#EEE9E0`)}>
                    <div style={css(`position:absolute;inset:0;background:#EEE9E0 center/cover no-repeat;background-image:url(${vd.photo});animation:rasaZoom 13s ease-in-out infinite alternate`)}></div>
                    <div style={css(`position:absolute;top:0;bottom:0;left:0;width:40%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.34),transparent);animation:rasaShine 6.5s ease-in-out infinite;pointer-events:none;z-index:1`)}></div>
                    <div style={css(`position:absolute;bottom:5px;left:14px;display:flex;gap:9px;pointer-events:none;z-index:1`)}>
                      <span style={css(`width:6px;height:20px;border-radius:50%;background:rgba(255,255,255,.85);filter:blur(4px);animation:rasaSteam 3.4s ease-in infinite`)}></span>
                      <span style={css(`width:6px;height:20px;border-radius:50%;background:rgba(255,255,255,.85);filter:blur(4px);animation:rasaSteam 3.4s ease-in infinite 1s`)}></span>
                      <span style={css(`width:6px;height:20px;border-radius:50%;background:rgba(255,255,255,.85);filter:blur(4px);animation:rasaSteam 3.4s ease-in infinite 1.9s`)}></span>
                    </div>
                    <div style={css(`position:absolute;top:11px;left:11px;display:flex;align-items:center;gap:6px;background:rgba(251,250,247,.94);backdrop-filter:blur(4px);color:var(--adeep,#6E7A38);font:700 11px 'Inter';padding:6px 10px;border-radius:999px;z-index:2`)}>
                      <span style={css(`width:7px;height:7px;border-radius:50%;background:var(--a,#9BAA5C);animation:rasaPulse 1.4s infinite`)}></span>{vd.waitLabel}
                    </div>
                    <div style={css(`position:absolute;top:11px;right:11px;display:flex;align-items:center;gap:5px;background:rgba(22,19,32,.62);backdrop-filter:blur(4px);color:#fff;font:700 9px 'JetBrains Mono',monospace;letter-spacing:.5px;padding:5px 8px;border-radius:999px;z-index:2`)}>
                      <span style={css(`width:6px;height:6px;border-radius:50%;background:var(--alite,#C2D89B);animation:rasaPulse 1.2s infinite`)}></span>{vd.liveLabel}
                    </div>
                  </div>
                  <div style={css(`padding:13px 15px 15px`)}>
                    <div style={css(`display:flex;justify-content:space-between;align-items:flex-start;gap:8px`)}>
                      <div style={css(`font:700 16px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.2px`)}>{vd.name}</div>
                      <div style={css(`display:flex;align-items:center;gap:3px;background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);font:700 12px 'Inter';padding:4px 8px;border-radius:9px;white-space:nowrap`)}>★ {vd.rating}</div>
                    </div>
                    <div style={css(`font:500 12.5px 'Inter';color:#9A93A6;margin-top:4px`)}>{vd.cuisine}</div>
                    <div style={css(`display:flex;align-items:center;gap:5px;margin-top:9px`)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2.2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="2.6"></circle></svg>
                      <span style={css(`font:500 12px 'Inter';color:#B0A9BC`)}>{vd.area}</span>
                    </div>
                  </div>
                </button>
              </Fragment> )) }
              </div>
            </div>

            
            <div style={css(`padding:28px 22px 0`)}>
              <div style={css(`display:flex;align-items:baseline;justify-content:space-between;margin-bottom:5px`)}>
                <div style={css(`font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px`)}>All food trucks</div>
                <span style={css(`font:600 11px 'JetBrains Mono',monospace;color:#A39BB0;letter-spacing:.5px`)}>{vals.vendorCount} LIVE</span>
              </div>
              <div style={css(`font:500 12.5px 'Inter';color:#9A93A6;margin-bottom:14px`)}>Every truck on the road near you, right now</div>
              { arr(vals.homeVendors).map((vd, _k6) => ( <Fragment key={_k6}>
                <button onClick={vd.onClick} style={css(`display:flex;align-items:center;gap:13px;width:100%;text-align:left;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:10px;cursor:pointer;margin-bottom:11px`)}>
                  <div style={css(`position:relative;width:74px;height:74px;border-radius:var(--radM,14px);overflow:hidden;flex-shrink:0;background:#EEE9E0`)}>
                    <div style={css(`position:absolute;inset:0;background:#EEE9E0 center/cover no-repeat;background-image:url(${vd.photo});animation:rasaZoom 14s ease-in-out infinite alternate`)}></div>
                    <div style={css(`position:absolute;bottom:5px;left:6px;display:flex;align-items:center;gap:4px;background:rgba(22,19,32,.6);backdrop-filter:blur(3px);padding:2px 5px;border-radius:999px`)}>
                      <span style={css(`width:5px;height:5px;border-radius:50%;background:var(--alite,#C2D89B);animation:rasaPulse 1.2s infinite`)}></span>
                      <span style={css(`font:700 7px 'JetBrains Mono',monospace;color:#fff;letter-spacing:.4px`)}>LIVE</span>
                    </div>
                  </div>
                  <div style={css(`flex:1;min-width:0`)}>
                    <div style={css(`display:flex;justify-content:space-between;align-items:center;gap:8px`)}>
                      <div style={css(`font:700 14.5px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>{vd.name}</div>
                      <div style={css(`display:flex;align-items:center;gap:3px;background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);font:700 11px 'Inter';padding:3px 7px;border-radius:8px;flex-shrink:0`)}>★ {vd.rating}</div>
                    </div>
                    <div style={css(`font:500 11.5px 'Inter';color:#9A93A6;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>{vd.cuisine}</div>
                    <div style={css(`display:flex;align-items:center;gap:10px;margin-top:8px`)}>
                      <div style={css(`display:flex;align-items:center;gap:5px;background:var(--asoft,#EEF1DC);color:var(--adeep,#6E7A38);font:700 10.5px 'Inter';padding:3px 8px;border-radius:7px`)}>
                        <span style={css(`width:5px;height:5px;border-radius:50%;background:var(--a,#9BAA5C);animation:rasaPulse 1.4s infinite`)}></span>{vd.waitLabel}
                      </div>
                      <div style={css(`display:flex;align-items:center;gap:4px;min-width:0`)}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2.2" style={css(`flex-shrink:0`)}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="2.6"></circle></svg>
                        <span style={css(`font:500 11px 'Inter';color:#B0A9BC;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>{vd.area}</span>
                      </div>
                    </div>
                  </div>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2.4" style={css(`flex-shrink:0`)}><path d="m9 18 6-6-6-6"></path></svg>
                </button>
              </Fragment> )) }
            </div>
          </div>
          </> ) : null}

          
          { (vals.isCatResults) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;padding-bottom:28px`)}>
            <div style={css(`position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF`)}>
              <button onClick={vals.goCatBack} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
              <div><div style={css(`font:700 18px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.4px`)}>{vals.catResultLabel}</div><div style={css(`font:500 11px 'Inter';color:#9A93A6;margin-top:1px`)}>{vals.catResultCount} · order ahead</div></div>
            </div>

            
            <div className="scr" ref={vals.dragScroll} style={css(`display:flex;align-items:center;gap:9px;overflow-x:auto;padding:13px 18px 4px;cursor:grab`)}>
              <span style={css(`font:600 11px 'Inter';color:#9A93A6;flex-shrink:0`)}>Sort</span>
              { arr(vals.catSortChips).map((srt, _k7) => ( <Fragment key={_k7}>
                <button onClick={srt.onClick} style={css(`${srt.style}`)}>{srt.label}</button>
              </Fragment> )) }
            </div>

            <div style={css(`padding:12px 18px 0`)}>
              { arr(vals.catResultVendors).map((vd, _k8) => ( <Fragment key={_k8}>
                <button onClick={vd.onClick} style={css(`display:block;width:100%;text-align:left;padding:0;border:1px solid #ECE6DB;background:#fff;border-radius:var(--radXL,20px);overflow:hidden;cursor:pointer;margin-bottom:14px`)}>
                  <div style={css(`position:relative;height:130px;overflow:hidden;background:#EEE9E0`)}>
                    <div style={css(`position:absolute;inset:0;background:#EEE9E0 center/cover no-repeat;background-image:url(${vd.photo});animation:rasaZoom 13s ease-in-out infinite alternate`)}></div>
                    <div style={css(`position:absolute;top:0;bottom:0;left:0;width:40%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.34),transparent);animation:rasaShine 6.5s ease-in-out infinite;pointer-events:none;z-index:1`)}></div>
                    <div style={css(`position:absolute;top:10px;left:10px;display:flex;align-items:center;gap:6px;background:rgba(251,250,247,.94);backdrop-filter:blur(4px);color:var(--adeep,#6E7A38);font:700 11px 'Inter';padding:6px 10px;border-radius:999px;z-index:2`)}>
                      <span style={css(`width:7px;height:7px;border-radius:50%;background:var(--a,#9BAA5C);animation:rasaPulse 1.4s infinite`)}></span>{vd.waitLabel}
                    </div>
                    <div style={css(`position:absolute;top:10px;right:10px;display:flex;align-items:center;gap:5px;background:rgba(22,19,32,.62);backdrop-filter:blur(4px);color:#fff;font:700 9px 'JetBrains Mono',monospace;letter-spacing:.5px;padding:5px 8px;border-radius:999px;z-index:2`)}>
                      <span style={css(`width:6px;height:6px;border-radius:50%;background:var(--alite,#C2D89B);animation:rasaPulse 1.2s infinite`)}></span>{vd.liveLabel}
                    </div>
                  </div>
                  <div style={css(`padding:13px 15px 15px`)}>
                    <div style={css(`display:flex;justify-content:space-between;align-items:flex-start;gap:8px`)}>
                      <div style={css(`font:700 16px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.2px`)}>{vd.name}</div>
                      <div style={css(`display:flex;align-items:center;gap:3px;background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);font:700 12px 'Inter';padding:4px 8px;border-radius:9px;white-space:nowrap`)}>★ {vd.ratingLabel}</div>
                    </div>
                    <div style={css(`font:500 12.5px 'Inter';color:#9A93A6;margin-top:4px`)}>{vd.cuisine}</div>
                    <div style={css(`display:flex;align-items:center;gap:5px;margin-top:9px`)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2.2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="2.6"></circle></svg>
                      <span style={css(`font:500 12px 'Inter';color:#B0A9BC`)}>{vd.area}</span>
                    </div>
                  </div>
                </button>
              </Fragment> )) }
            </div>
          </div>
          </> ) : null}

          
          { (vals.isStreet) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;padding-bottom:28px`)}>
            <div style={css(`position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF`)}>
              <button onClick={vals.goHome} aria-label="Back" style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
              <div style={css(`min-width:0`)}><div style={css(`font:700 18px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.4px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>{vals.streetName}</div><div style={css(`font:500 11px 'Inter';color:#9A93A6;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>{vals.streetSubtitle}</div></div>
            </div>

            
            <div className="scr" ref={vals.dragScroll} style={css(`display:flex;align-items:center;gap:9px;overflow-x:auto;padding:13px 18px 4px;cursor:grab`)}>
              { arr(vals.streetChips).map((chip, _k9) => ( <Fragment key={_k9}>
                <button onClick={chip.onClick} style={css(`${chip.style}`)}>{chip.label}</button>
              </Fragment> )) }
            </div>

            <div style={css(`padding:12px 18px 0`)}>
              { (vals.streetEmpty) ? ( <>
                <div style={css(`text-align:center;padding:46px 24px`)}>
                  <div style={css(`width:64px;height:64px;border-radius:50%;background:#F4EEE7;display:flex;align-items:center;justify-content:center;margin:0 auto 16px`)}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"></path></svg></div>
                  <div style={css(`font:700 15px var(--display,'Space Grotesk');color:#3B2630`)}>No trucks here right now</div>
                  <div style={css(`font:500 12px 'Inter';color:#9A93A6;margin-top:6px;max-width:250px;margin-left:auto;margin-right:auto`)}>No open vendors on this street yet. We'll ping you the moment one rolls in.</div>
                  <button style={css(`margin-top:18px;background:none;color:var(--p,#8A1538);border:1.5px solid var(--p,#8A1538);border-radius:12px;padding:11px 22px;font:700 12.5px var(--display,'Space Grotesk');cursor:pointer`)}>Notify me</button>
                </div>
              </> ) : null}
              { arr(vals.streetVendors).map((vd, _k10) => ( <Fragment key={_k10}>
                <button onClick={vd.onClick} style={css(`display:block;width:100%;text-align:left;padding:0;border:1px solid #ECE6DB;background:#fff;border-radius:var(--radXL,20px);overflow:hidden;cursor:pointer;margin-bottom:14px`)}>
                  <div style={css(`position:relative;height:130px;overflow:hidden;background:#EEE9E0`)}>
                    <div style={css(`position:absolute;inset:0;background:#EEE9E0 center/cover no-repeat;background-image:url(${vd.photo});animation:rasaZoom 13s ease-in-out infinite alternate`)}></div>
                    <div style={css(`position:absolute;top:0;bottom:0;left:0;width:40%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.34),transparent);animation:rasaShine 6.5s ease-in-out infinite;pointer-events:none;z-index:1`)}></div>
                    <div style={css(`position:absolute;top:10px;left:10px;display:flex;align-items:center;gap:6px;background:rgba(251,250,247,.94);backdrop-filter:blur(4px);color:var(--adeep,#6E7A38);font:700 11px 'Inter';padding:6px 10px;border-radius:999px;z-index:2`)}>
                      <span style={css(`width:7px;height:7px;border-radius:50%;background:var(--a,#9BAA5C);animation:rasaPulse 1.4s infinite`)}></span>{vd.waitLabel}
                    </div>
                    <div style={css(`position:absolute;top:10px;right:10px;display:flex;align-items:center;gap:5px;background:rgba(22,19,32,.62);backdrop-filter:blur(4px);color:#fff;font:700 9px 'JetBrains Mono',monospace;letter-spacing:.5px;padding:5px 8px;border-radius:999px;z-index:2`)}>
                      <span style={css(`width:6px;height:6px;border-radius:50%;background:var(--alite,#C2D89B);animation:rasaPulse 1.2s infinite`)}></span>{vd.liveLabel}
                    </div>
                  </div>
                  <div style={css(`padding:13px 15px 15px`)}>
                    <div style={css(`display:flex;justify-content:space-between;align-items:flex-start;gap:8px`)}>
                      <div style={css(`font:700 16px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.2px`)}>{vd.name}</div>
                      <div style={css(`display:flex;align-items:center;gap:3px;background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);font:700 12px 'Inter';padding:4px 8px;border-radius:9px;white-space:nowrap`)}>★ {vd.ratingLabel}</div>
                    </div>
                    <div style={css(`font:500 12.5px 'Inter';color:#9A93A6;margin-top:4px`)}>{vd.cuisine}</div>
                    <div style={css(`display:flex;align-items:center;gap:5px;margin-top:9px`)}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2.2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="2.6"></circle></svg>
                      <span style={css(`font:500 12px 'Inter';color:#B0A9BC`)}>{vd.area}</span>
                    </div>
                  </div>
                </button>
              </Fragment> )) }
            </div>
          </div>
          </> ) : null}

          
          { (vals.isSearch) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;padding-bottom:28px`)}>
            <div style={css(`position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:10px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF`)}>
              <button onClick={vals.goHome} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
              <div style={css(`flex:1;display:flex;align-items:center;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:10px 13px`)}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#B0A9BC" strokeWidth="2.2" style={css(`flex-shrink:0`)}><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4-4"></path></svg>
                <input value={vals.searchQuery} onChange={vals.setSearch} autoFocus={true} placeholder="Search vendors, dishes…" style={css(`flex:1;border:none;outline:none;background:none;font:500 13.5px 'Inter';color:#3B2630;min-width:0`)} />
                { (vals.searchActive) ? ( <>
                  <button onClick={vals.clearSearch} style={css(`background:none;border:none;cursor:pointer;padding:0;display:flex;flex-shrink:0`)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B0A9BC" strokeWidth="2.4"><circle cx="12" cy="12" r="10"></circle><path d="M15 9l-6 6M9 9l6 6"></path></svg></button>
                </> ) : null}
              </div>
            </div>

            <div style={css(`padding:18px 22px 0`)}>
              
              { (vals.searchIdle) ? ( <>
                <div style={css(`font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin-bottom:13px`)}>Popular searches</div>
                <div style={css(`display:flex;flex-wrap:wrap;gap:9px`)}>
                  { arr(vals.searchSuggestions).map((sug, _k11) => ( <Fragment key={_k11}>
                    <button onClick={sug.onClick} style={css(`display:flex;align-items:center;gap:6px;background:#fff;border:1px solid #ECE6DB;border-radius:999px;padding:9px 15px;cursor:pointer;font:600 12.5px 'Inter';color:#5A5368`)}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2"><path d="M3 6h18M7 12h10M11 18h2"></path></svg>{sug.label}</button>
                  </Fragment> )) }
                </div>
              </> ) : null}

              
              { (vals.searchNoResults) ? ( <>
                <div style={css(`text-align:center;padding:50px 20px`)}>
                  <div style={css(`width:64px;height:64px;border-radius:50%;background:#F4EEE7;display:flex;align-items:center;justify-content:center;margin:0 auto 16px`)}><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4-4"></path></svg></div>
                  <div style={css(`font:700 15px var(--display,'Space Grotesk');color:#3B2630`)}>No matches found</div>
                  <div style={css(`font:500 12px 'Inter';color:#9A93A6;margin-top:6px`)}>Try a dish or cuisine — like “biryani” or “dosa”.</div>
                </div>
              </> ) : null}

              
              { (vals.hasTruckResults) ? ( <>
                <div style={css(`font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin-bottom:12px`)}>Food trucks · {vals.searchTruckCount}</div>
                { arr(vals.searchTrucks).map((vd, _k12) => ( <Fragment key={_k12}>
                  <button onClick={vd.onClick} style={css(`display:flex;align-items:center;gap:13px;width:100%;text-align:left;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:10px;cursor:pointer;margin-bottom:11px`)}>
                    <div style={css(`width:60px;height:60px;border-radius:var(--radM,13px);flex-shrink:0;background:#EEE9E0 center/cover no-repeat;background-image:url(${vd.photo})`)}></div>
                    <div style={css(`flex:1;min-width:0`)}>
                      <div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>{vd.name}</div>
                      <div style={css(`font:500 11.5px 'Inter';color:#9A93A6;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>{vd.cuisine}</div>
                      <div style={css(`display:flex;align-items:center;gap:5px;margin-top:7px`)}><span style={css(`display:flex;align-items:center;gap:4px;background:var(--asoft,#EEF1DC);color:var(--adeep,#6E7A38);font:700 10px 'Inter';padding:3px 7px;border-radius:6px`)}><span style={css(`width:5px;height:5px;border-radius:50%;background:var(--a,#9BAA5C);animation:rasaPulse 1.4s infinite`)}></span>{vd.waitLabel}</span><span style={css(`font:700 11px 'Inter';color:var(--p,#7D1535)`)}>★ {vd.rating}</span></div>
                    </div>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2.4" style={css(`flex-shrink:0`)}><path d="m9 18 6-6-6-6"></path></svg>
                  </button>
                </Fragment> )) }
              </> ) : null}

              
              { (vals.hasDishResults) ? ( <>
                <div style={css(`font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin:18px 0 12px`)}>Dishes · {vals.searchDishCount}</div>
                { arr(vals.searchDishes).map((dish, _k13) => ( <Fragment key={_k13}>
                  <button onClick={dish.onClick} style={css(`display:flex;align-items:center;gap:13px;width:100%;text-align:left;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:10px;cursor:pointer;margin-bottom:11px`)}>
                    <div style={css(`width:54px;height:54px;border-radius:12px;flex-shrink:0;background:#EEE9E0 center/cover no-repeat;background-image:url(${dish.img})`)}></div>
                    <div style={css(`flex:1;min-width:0`)}>
                      <div style={css(`display:flex;justify-content:space-between;gap:8px`)}><span style={css(`font:700 13px var(--display,'Space Grotesk');color:#3B2630;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>{dish.name}</span><span style={css(`font:700 12.5px var(--display,'Space Grotesk');color:var(--p,#7D1535);white-space:nowrap`)}>{dish.priceLabel}</span></div>
                      <div style={css(`font:500 11px 'Inter';color:#9A93A6;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>{dish.desc}</div>
                      <div style={css(`display:flex;align-items:center;gap:5px;margin-top:6px`)}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#B0A9BC" strokeWidth="2.2" style={css(`flex-shrink:0`)}><path d="M14 18V6a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h2"></path><path d="M14 9h4l4 4v4a1 1 0 0 1-1 1h-1"></path><circle cx="7.5" cy="18.5" r="2.5"></circle><circle cx="17.5" cy="18.5" r="2.5"></circle></svg><span style={css(`font:600 11px 'Inter';color:#B0A9BC`)}>{dish.vendorName}</span></div>
                    </div>
                  </button>
                </Fragment> )) }
              </> ) : null}
            </div>
          </div>
          </> ) : null}

          
          { (vals.isSupport) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;padding-bottom:28px`)}>
            <div style={css(`position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF`)}>
              <button onClick={vals.goProfile} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
              <span style={css(`font:700 18px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.4px`)}>Help &amp; Support</span>
            </div>

            <div style={css(`padding:18px 22px 0`)}>
              
              <div style={css(`position:relative;background:linear-gradient(135deg,var(--p,#7D1535),var(--p2,#9E2A48));border-radius:var(--radXL,22px);padding:20px;overflow:hidden`)}>
                <div style={css(`position:absolute;right:-26px;top:-26px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.08)`)}></div>
                <div style={css(`position:relative`)}>
                  <div style={css(`font:700 19px var(--display,'Space Grotesk');color:#fff;letter-spacing:-.3px`)}>Hi Ananya, how can we help?</div>
                  <div style={css(`font:500 12px 'Inter';color:rgba(255,255,255,.82);margin-top:6px;line-height:1.5`)}>Search our help centre or reach the team directly — we usually reply in a few minutes.</div>
                  <div style={css(`display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.2);border-radius:12px;padding:11px 13px;margin-top:14px`)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4-4"></path></svg>
                    <span style={css(`font:500 12.5px 'Inter';color:rgba(255,255,255,.9)`)}>Describe your issue…</span>
                  </div>
                </div>
              </div>

              
              <div style={css(`display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:16px`)}>
                <button onClick={vals.goChat} style={css(`display:flex;flex-direction:column;align-items:center;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:15px 8px;cursor:pointer`)}>
                  <div style={css(`width:40px;height:40px;border-radius:12px;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center`)}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.1"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.8-.8L3 21l1.9-5.2A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z"></path></svg></div>
                  <span style={css(`font:700 11.5px var(--display,'Space Grotesk');color:#3B2630`)}>Live Chat</span>
                </button>
                <button style={css(`display:flex;flex-direction:column;align-items:center;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:15px 8px;cursor:pointer`)}>
                  <div style={css(`width:40px;height:40px;border-radius:12px;background:var(--asoft,#EEF1DC);display:flex;align-items:center;justify-content:center`)}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--adeep,#6E7A38)" strokeWidth="2.1"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"></path></svg></div>
                  <span style={css(`font:700 11.5px var(--display,'Space Grotesk');color:#3B2630`)}>Call Us</span>
                </button>
                <button style={css(`display:flex;flex-direction:column;align-items:center;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:15px 8px;cursor:pointer`)}>
                  <div style={css(`width:40px;height:40px;border-radius:12px;background:#F4EEE7;display:flex;align-items:center;justify-content:center`)}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.1"><rect x="2" y="4" width="20" height="16" rx="3"></rect><path d="m2 7 10 6 10-6"></path></svg></div>
                  <span style={css(`font:700 11.5px var(--display,'Space Grotesk');color:#3B2630`)}>Email</span>
                </button>
              </div>

              
              <div style={css(`font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin:22px 0 12px`)}>Browse topics</div>
              { arr(vals.supportTopicList).map((tp, _k14) => ( <Fragment key={_k14}>
                <button onClick={tp.onClick} style={css(`display:flex;align-items:center;gap:13px;width:100%;text-align:left;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:14px;cursor:pointer;margin-bottom:11px`)}>
                  <div style={css(`width:42px;height:42px;border-radius:12px;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center;flex-shrink:0`)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.1"><path d={tp.icon}></path></svg></div>
                  <div style={css(`flex:1;min-width:0`)}><div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630`)}>{tp.title}</div><div style={css(`font:500 11.5px 'Inter';color:#9A93A6;margin-top:3px`)}>{tp.desc}</div></div>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2.4" style={css(`flex-shrink:0`)}><path d="m9 18 6-6-6-6"></path></svg>
                </button>
              </Fragment> )) }

              
              <button onClick={vals.goTicket} style={css(`display:flex;align-items:center;gap:13px;width:100%;text-align:left;background:#241F33;border:none;border-radius:var(--radL,16px);padding:15px;cursor:pointer;margin-top:5px`)}>
                <div style={css(`width:42px;height:42px;border-radius:12px;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;flex-shrink:0`)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.1"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></div>
                <div style={css(`flex:1`)}><div style={css(`font:700 14px var(--display,'Space Grotesk');color:#fff`)}>Raise a ticket</div><div style={css(`font:500 11.5px 'Inter';color:rgba(255,255,255,.7);margin-top:3px`)}>Still stuck? We’ll get back within 24h</div></div>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="2.4" style={css(`flex-shrink:0`)}><path d="m9 18 6-6-6-6"></path></svg>
              </button>
            </div>
          </div>
          </> ) : null}

          
          { (vals.isSupportTopic) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;padding-bottom:28px`)}>
            <div style={css(`position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF`)}>
              <button onClick={vals.goSupport} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
              <span style={css(`font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px`)}>{vals.activeTopicTitle}</span>
            </div>

            <div style={css(`padding:18px 22px 0`)}>
              <div style={css(`font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin-bottom:12px`)}>Frequently asked</div>
              { arr(vals.topicFaqs).map((f, _k15) => ( <Fragment key={_k15}>
                <div style={css(`background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);overflow:hidden;margin-bottom:11px`)}>
                  <button onClick={f.onClick} style={css(`width:100%;display:flex;align-items:center;gap:12px;text-align:left;background:none;border:none;padding:15px;cursor:pointer`)}>
                    <span style={css(`flex:1;font:700 13px var(--display,'Space Grotesk');color:#3B2630;line-height:1.4`)}>{f.q}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.4" style={css(`flex-shrink:0;transform:${f.chevron}`)}><path d="m6 9 6 6 6-6"></path></svg>
                  </button>
                  { (f.open) ? ( <>
                    <div style={css(`padding:0 15px 15px;font:500 12.5px 'Inter';color:#6F6A7D;line-height:1.6`)}>{f.a}</div>
                  </> ) : null}
                </div>
              </Fragment> )) }

              
              <div style={css(`background:#F4EEE7;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:15px;margin-top:6px;text-align:center`)}>
                <div style={css(`font:700 13px var(--display,'Space Grotesk');color:#3B2630`)}>Still need help?</div>
                <div style={css(`font:500 11.5px 'Inter';color:#9A93A6;margin-top:4px`)}>Our team is one tap away.</div>
                <div style={css(`display:flex;gap:10px;margin-top:13px`)}>
                  <button onClick={vals.goChat} style={css(`flex:1;display:flex;align-items:center;justify-content:center;gap:7px;background:var(--p,#7D1535);color:#fff;border:none;border-radius:12px;padding:12px;cursor:pointer;font:700 12px var(--display,'Space Grotesk')`)}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.8-.8L3 21l1.9-5.2A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z"></path></svg>Live chat</button>
                  <button onClick={vals.goTicket} style={css(`flex:1;background:var(--pchip,#F1DEE3);color:var(--p,#7D1535);border:none;border-radius:12px;padding:12px;cursor:pointer;font:700 12px var(--display,'Space Grotesk')`)}>Raise ticket</button>
                </div>
              </div>
            </div>
          </div>
          </> ) : null}

          
          { (vals.isChat) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%`)}>
            <div style={css(`position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:12px 18px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF`)}>
              <button onClick={vals.goSupport} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
              <div style={css(`position:relative;flex-shrink:0`)}><div style={css(`width:38px;height:38px;border-radius:50%;background:var(--p,#7D1535);display:flex;align-items:center;justify-content:center;font:700 14px var(--display,'Space Grotesk');color:#fff`)}>R</div><span style={css(`position:absolute;right:-1px;bottom:-1px;width:11px;height:11px;border-radius:50%;background:#3FB37F;border:2px solid #FAF6F3`)}></span></div>
              <div style={css(`flex:1`)}><div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630`)}>Riya · Rasa Support</div><div style={css(`font:500 10.5px 'Inter';color:#3FB37F`)}>Online · replies in ~2 min</div></div>
            </div>

            <div style={css(`flex:1;padding:18px;background:#F4EEE7`)}>
              <div style={css(`text-align:center;font:600 9.5px 'JetBrains Mono',monospace;color:#B0A9BC;text-transform:uppercase;letter-spacing:.6px;margin-bottom:14px`)}>Today</div>
              { arr(vals.chatMsgs).map((m, _k16) => ( <Fragment key={_k16}>
                <div style={css(`${m.rowStyle}`)}><div style={css(`${m.bubbleStyle}`)}>{m.text}</div></div>
              </Fragment> )) }
            </div>

            <div style={css(`position:sticky;bottom:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:11px 16px 13px;z-index:45`)}>
              <div className="scr" ref={vals.dragScroll} style={css(`display:flex;gap:8px;overflow-x:auto;padding-bottom:10px;cursor:grab`)}>
                { arr(vals.chatQuickReplies).map((qr, _k17) => ( <Fragment key={_k17}>
                  <button onClick={qr.onClick} style={css(`flex-shrink:0;background:#fff;border:1px solid #ECE6DB;border-radius:999px;padding:7px 13px;cursor:pointer;font:600 11.5px 'Inter';color:var(--p,#7D1535)`)}>{qr.label}</button>
                </Fragment> )) }
              </div>
              <div style={css(`display:flex;align-items:center;gap:9px`)}>
                <div style={css(`flex:1;display:flex;align-items:center;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:11px 14px`)}>
                  <input value={vals.chatInput} onChange={vals.onChatInput} onKeyDown={vals.onChatKey} placeholder="Type a message…" style={css(`flex:1;border:none;outline:none;background:none;font:500 13px 'Inter';color:#3B2630;min-width:0`)} />
                </div>
                <button onClick={vals.sendChat} style={css(`width:44px;height:44px;border-radius:var(--radM,13px);background:var(--p,#7D1535);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0`)}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg></button>
              </div>
            </div>
          </div>
          </> ) : null}

          
          { (vals.isTicket) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%`)}>
            <div style={css(`position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF`)}>
              <button onClick={vals.goSupport} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
              <span style={css(`font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px`)}>Raise a ticket</span>
            </div>

            <div style={css(`padding:18px 22px 0;flex:1`)}>
              <div style={css(`font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin-bottom:11px`)}>Category</div>
              <div className="scr" ref={vals.dragScroll} style={css(`display:flex;gap:9px;overflow-x:auto;margin:0 -22px 18px;padding:0 22px 4px;cursor:grab`)}>
                { arr(vals.ticketCats).map((tc, _k18) => ( <Fragment key={_k18}>
                  <button onClick={tc.onClick} style={css(`${tc.style}`)}>{tc.label}</button>
                </Fragment> )) }
              </div>

              <div style={css(`font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin-bottom:11px`)}>Describe the issue</div>
              <textarea value={vals.ticketText} onChange={vals.onTicketText} placeholder="Tell us what happened — include your order or transaction ID if you have it." style={css(`width:100%;height:130px;resize:none;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:14px;font:500 13px/1.6 'Inter';color:#3B2630;outline:none;box-sizing:border-box`)}></textarea>

              <button style={css(`display:flex;align-items:center;justify-content:center;gap:8px;width:100%;background:none;border:1.5px dashed #D6C2C7;border-radius:var(--radM,14px);padding:14px;cursor:pointer;margin-top:13px`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2"><path d="M21.4 11.05 12 20.5a5.5 5.5 0 0 1-7.8-7.8l9.2-9.2a3.7 3.7 0 0 1 5.2 5.2l-9.2 9.2a1.8 1.8 0 0 1-2.6-2.6l8.5-8.5"></path></svg><span style={css(`font:700 12.5px var(--display,'Space Grotesk');color:var(--p,#7D1535)`)}>Attach a screenshot</span></button>

              <div style={css(`display:flex;align-items:flex-start;gap:9px;background:var(--asoft,#EEF1DC);border:1px solid var(--aborder,#DCE3C0);border-radius:var(--radM,13px);padding:12px 14px;margin-top:16px`)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--adeep,#6E7A38)" strokeWidth="2.2" style={css(`flex-shrink:0;margin-top:1px`)}><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4M12 8h.01"></path></svg>
                <span style={css(`font:500 11.5px 'Inter';color:var(--adeep,#6E7A38);line-height:1.5`)}>Most tickets are resolved within 24 hours. You’ll get updates by notification and email.</span>
              </div>
            </div>

            <div style={css(`position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px;z-index:45`)}>
              { (vals.ticketCanSubmit) ? ( <>
                <button onClick={vals.submitTicket} style={css(`width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;font:700 13px var(--display,'Space Grotesk');letter-spacing:.5px;cursor:pointer`)}>Submit ticket</button>
              </> ) : null}
              { (vals.ticketBlocked) ? ( <>
                <button style={css(`width:100%;background:#E7D6DB;color:#B79AA2;border:none;border-radius:var(--radL,16px);padding:16px;font:700 13px var(--display,'Space Grotesk');letter-spacing:.5px;cursor:not-allowed`)}>Submit ticket</button>
              </> ) : null}
            </div>
          </div>
          </> ) : null}

          
          { (vals.isEditAddress) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%`)}>
            <div style={css(`position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF`)}>
              <button onClick={vals.goProfile} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
              <span style={css(`font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px`)}>Edit address</span>
            </div>

            <div style={css(`padding:18px 22px 0;flex:1`)}>
              <div style={css(`font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin-bottom:10px`)}>Save as</div>
              <div style={css(`display:flex;gap:9px;margin-bottom:20px`)}>
                { arr(vals.addrLabels).map((al, _k19) => ( <Fragment key={_k19}>
                  <button onClick={al.onClick} style={css(`${al.style}`)}>{al.label}</button>
                </Fragment> )) }
              </div>

              <div style={css(`font:600 11px 'Inter';color:#6F6A7D;margin-bottom:6px`)}>Flat / Street</div>
              <input value={vals.addrLine1} onChange={vals.onAddrLine1} placeholder="House / flat, street" style={css(`width:100%;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;font:500 13px 'Inter';color:#3B2630;outline:none;box-sizing:border-box;margin-bottom:14px`)} />

              <div style={css(`font:600 11px 'Inter';color:#6F6A7D;margin-bottom:6px`)}>Area / Locality</div>
              <input value={vals.addrLine2} onChange={vals.onAddrLine2} placeholder="Area, locality" style={css(`width:100%;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;font:500 13px 'Inter';color:#3B2630;outline:none;box-sizing:border-box;margin-bottom:14px`)} />

              <div style={css(`display:flex;gap:12px;margin-bottom:14px`)}>
                <div style={css(`flex:1.4`)}><div style={css(`font:600 11px 'Inter';color:#6F6A7D;margin-bottom:6px`)}>City, State</div><input value={vals.addrCity} onChange={vals.onAddrCity} placeholder="City, State" style={css(`width:100%;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;font:500 13px 'Inter';color:#3B2630;outline:none;box-sizing:border-box`)} /></div>
                <div style={css(`flex:1`)}><div style={css(`font:600 11px 'Inter';color:#6F6A7D;margin-bottom:6px`)}>PIN</div><input value={vals.addrPin} onChange={vals.onAddrPin} placeholder="560038" style={css(`width:100%;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;font:500 13px 'JetBrains Mono',monospace;color:#3B2630;outline:none;box-sizing:border-box`)} /></div>
              </div>

              <div style={css(`display:flex;align-items:center;gap:9px;background:#F4EEE7;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:12px 14px`)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.1" style={css(`flex-shrink:0`)}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="2.6"></circle></svg><span style={css(`font:500 11.5px 'Inter';color:#6F6A7D`)}>Used for pickup directions and nearby trucks.</span></div>
            </div>

            <div style={css(`position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px;z-index:45`)}>
              <button onClick={vals.saveAddress} style={css(`width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;font:700 13px var(--display,'Space Grotesk');letter-spacing:.5px;cursor:pointer`)}>Save address</button>
            </div>
          </div>
          </> ) : null}

          
          { (vals.isNotifs) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;padding-bottom:28px`)}>
            <div style={css(`position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF`)}>
              <button onClick={vals.goProfile} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
              <span style={css(`font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px`)}>Notifications</span>
            </div>

            <div style={css(`padding:18px 22px 0`)}>
              <div style={css(`font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin-bottom:12px`)}>Preferences</div>
              <div style={css(`background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);overflow:hidden`)}>
                { arr(vals.notifRows).map((n, _k20) => ( <Fragment key={_k20}>
                  <div style={css(`display:flex;align-items:center;gap:13px;padding:15px;border-bottom:1px solid #F1EBE3`)}>
                    <div style={css(`flex:1`)}><div style={css(`font:700 13px var(--display,'Space Grotesk');color:#3B2630`)}>{n.title}</div><div style={css(`font:500 11px 'Inter';color:#9A93A6;margin-top:3px`)}>{n.desc}</div></div>
                    <button onClick={n.onToggle} style={css(`${n.trackStyle}`)} aria-label={n.title}><span style={css(`${n.knobStyle}`)}></span></button>
                  </div>
                </Fragment> )) }
              </div>
              <div style={css(`font:500 11px 'Inter';color:#B0A9BC;line-height:1.5;margin-top:14px;padding:0 4px`)}>You can change these anytime. Critical security and payment alerts are always sent.</div>
            </div>
          </div>
          </> ) : null}

          
          { (vals.isLanguage) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%`)}>
            <div style={css(`position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF`)}>
              <button onClick={vals.goProfile} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
              <span style={css(`font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px`)}>Language</span>
            </div>

            <div style={css(`padding:18px 22px 0;flex:1`)}>
              <div style={css(`font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin-bottom:12px`)}>Choose your language</div>
              <div style={css(`background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);overflow:hidden`)}>
                { arr(vals.langRows).map((lg, _k21) => ( <Fragment key={_k21}>
                  <button onClick={lg.onClick} style={css(`display:flex;align-items:center;gap:12px;width:100%;text-align:left;background:none;border:none;border-bottom:1px solid #F1EBE3;padding:15px;cursor:pointer`)}>
                    <span style={css(`flex:1;font:600 13.5px 'Inter';color:#3B2630`)}>{lg.label}</span>
                    <div style={css(`${lg.radioStyle}`)}><span style={css(`color:#fff;font-size:12px;font-weight:700`)}>{lg.tick}</span></div>
                  </button>
                </Fragment> )) }
              </div>
            </div>

            <div style={css(`position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px;z-index:45`)}>
              <button onClick={vals.saveLanguage} style={css(`width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;font:700 13px var(--display,'Space Grotesk');letter-spacing:.5px;cursor:pointer`)}>Save</button>
            </div>
          </div>
          </> ) : null}

          
          { (vals.isLogin) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%`)}>
            <div style={css(`flex:1;display:flex;flex-direction:column;justify-content:center;padding:0 26px`)}>
              <div style={css(`display:flex;flex-direction:column;align-items:center;text-align:center;margin-bottom:34px`)}>
                <div style={css(`width:62px;height:62px;border-radius:var(--radL,18px);background:var(--p,#7D1535);color:#fff;display:flex;align-items:center;justify-content:center;font:700 30px var(--display,'Space Grotesk')`)}>R</div>
                <div style={css(`font:700 26px var(--display,'Space Grotesk');color:#3B2630;margin-top:18px;letter-spacing:-.5px`)}>Welcome back</div>
                <div style={css(`font:500 12.5px 'Inter';color:#9A93A6;margin-top:7px;line-height:1.5;max-width:250px`)}>Sign in to skip the queue and order ahead from your favourite trucks.</div>
              </div>

              <div style={css(`font:600 11px 'Inter';color:#6F6A7D;margin-bottom:6px`)}>Phone number</div>
              <div style={css(`display:flex;align-items:center;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;margin-bottom:14px`)}>
                <span style={css(`font:700 13px var(--display,'Space Grotesk');color:#3B2630;border-right:1px solid #ECE6DB;padding-right:10px`)}>+91</span>
                <input placeholder="98765 43210" style={css(`flex:1;border:none;outline:none;background:none;font:500 13px 'Inter';color:#3B2630;min-width:0`)} />
              </div>

              <div style={css(`font:600 11px 'Inter';color:#6F6A7D;margin-bottom:6px`)}>Password</div>
              <div style={css(`display:flex;align-items:center;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;margin-bottom:8px`)}>
                <input type="password" value="rasa1234" style={css(`flex:1;border:none;outline:none;background:none;font:500 13px 'Inter';color:#3B2630;min-width:0`)} />
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#B0A9BC" strokeWidth="2.1"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </div>
              <div style={css(`text-align:right;margin-bottom:22px`)}><span style={css(`font:600 11.5px 'Inter';color:var(--p,#7D1535);cursor:pointer`)}>Forgot password?</span></div>

              <button onClick={vals.goHome} style={css(`width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;font:700 13.5px var(--display,'Space Grotesk');letter-spacing:.3px;cursor:pointer`)}>Sign in</button>

              <div style={css(`display:flex;align-items:center;gap:12px;margin:22px 0`)}><div style={css(`flex:1;height:1px;background:#E7DFD2`)}></div><span style={css(`font:600 10px 'JetBrains Mono',monospace;color:#B0A9BC;letter-spacing:.5px`)}>OR</span><div style={css(`flex:1;height:1px;background:#E7DFD2`)}></div></div>

              <div style={css(`display:flex;flex-direction:column;gap:11px`)}>
                <button onClick={vals.goHome} style={css(`width:100%;display:flex;align-items:center;justify-content:center;gap:10px;background:#fff;color:#3B2630;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:14px;font:700 12.5px var(--display,'Space Grotesk');cursor:pointer`)}><svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"></path><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.65l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"></path><path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"></path><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"></path></svg> Continue with Google</button>
                <button onClick={vals.goHome} style={css(`width:100%;display:flex;align-items:center;justify-content:center;gap:9px;background:#fff;color:#3B2630;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:14px;font:700 12.5px var(--display,'Space Grotesk');cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.1"><rect x="2" y="4" width="20" height="16" rx="3"></rect><path d="m2 7 10 6 10-6"></path></svg> Continue with email</button>
              </div>

              <div style={css(`text-align:center;margin-top:24px;font:500 12px 'Inter';color:#9A93A6`)}>New to Rasa? <span onClick={vals.goSignup} style={css(`color:var(--p,#7D1535);font-weight:700;cursor:pointer`)}>Create account</span></div>
            </div>
          </div>
          </> ) : null}

          
          { (vals.isSignup) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%`)}>
            <div style={css(`position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF`)}>
              <button onClick={vals.goLogin} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
              <span style={css(`font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px`)}>Create account</span>
            </div>

            <div style={css(`padding:18px 26px 0;flex:1`)}>
              <div style={css(`font:700 22px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.4px`)}>Join Rasa</div>
              <div style={css(`font:500 12.5px 'Inter';color:#9A93A6;margin-top:6px;line-height:1.5;margin-bottom:22px`)}>Create an account to order ahead, save addresses and earn reward points.</div>

              <div style={css(`font:600 11px 'Inter';color:#6F6A7D;margin-bottom:6px`)}>Full name</div>
              <input placeholder="Your name" style={css(`width:100%;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;font:500 13px 'Inter';color:#3B2630;outline:none;box-sizing:border-box;margin-bottom:14px`)} />

              <div style={css(`font:600 11px 'Inter';color:#6F6A7D;margin-bottom:6px`)}>Phone number</div>
              <div style={css(`display:flex;align-items:center;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;margin-bottom:14px`)}>
                <span style={css(`font:700 13px var(--display,'Space Grotesk');color:#3B2630;border-right:1px solid #ECE6DB;padding-right:10px`)}>+91</span>
                <input placeholder="98765 43210" style={css(`flex:1;border:none;outline:none;background:none;font:500 13px 'Inter';color:#3B2630;min-width:0`)} />
              </div>

              <div style={css(`font:600 11px 'Inter';color:#6F6A7D;margin-bottom:6px`)}>Email</div>
              <input placeholder="you@example.com" style={css(`width:100%;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;font:500 13px 'Inter';color:#3B2630;outline:none;box-sizing:border-box;margin-bottom:14px`)} />

              <div style={css(`font:600 11px 'Inter';color:#6F6A7D;margin-bottom:6px`)}>Create password</div>
              <input type="password" placeholder="At least 8 characters" style={css(`width:100%;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;font:500 13px 'Inter';color:#3B2630;outline:none;box-sizing:border-box;margin-bottom:14px`)} />

              <div style={css(`font:600 11px 'Inter';color:#6F6A7D;margin-bottom:6px`)}>Confirm password</div>
              <input type="password" placeholder="Re-enter your password" style={css(`width:100%;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:13px 14px;font:500 13px 'Inter';color:#3B2630;outline:none;box-sizing:border-box;margin-bottom:16px`)} />

              <div style={css(`display:flex;align-items:flex-start;gap:9px;margin-bottom:6px`)}><div style={css(`width:18px;height:18px;border-radius:6px;background:var(--p,#7D1535);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px`)}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2"><path d="m5 12 5 5 9-10"></path></svg></div><span style={css(`font:500 11.5px 'Inter';color:#9A93A6;line-height:1.5`)}>I agree to Rasa’s <span style={css(`color:var(--p,#7D1535);font-weight:600`)}>Terms</span> and <span style={css(`color:var(--p,#7D1535);font-weight:600`)}>Privacy Policy</span>.</span></div>
            </div>

            <div style={css(`position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px;z-index:45`)}>
              <button onClick={vals.goOtp} style={css(`width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;font:700 13.5px var(--display,'Space Grotesk');letter-spacing:.3px;cursor:pointer`)}>Create account</button>
              <div style={css(`text-align:center;margin-top:11px;font:500 12px 'Inter';color:#9A93A6`)}>Already have an account? <span onClick={vals.goLogin} style={css(`color:var(--p,#7D1535);font-weight:700;cursor:pointer`)}>Sign in</span></div>
            </div>
          </div>
          </> ) : null}

          
          { (vals.isOtp) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%`)}>
            <div style={css(`position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #F1EBE3`)}>
              <button onClick={vals.goSignup} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.2"><path d="M15 18l-6-6 6-6"></path></svg></button>
              <span style={css(`font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px`)}>Verify number</span>
            </div>

            <div style={css(`padding:26px 26px 0;flex:1`)}>
              <div style={css(`font:700 22px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.4px`)}>Enter the code</div>
              <div style={css(`font:500 12.5px 'Inter';color:#9A93A6;margin-top:6px;line-height:1.5;margin-bottom:30px`)}>We sent a 4-digit verification code to your phone. Enter it below to finish creating your account.</div>

              <div style={css(`display:flex;gap:13px;justify-content:center;margin-bottom:26px`)}>
                <input id="otp-box-0" value={vals.otp0} onChange={vals.onOtp0} onKeyDown={vals.onOtpKey0} inputMode="numeric" maxLength="1" autoComplete="off" style={css(`${vals.otpBoxStyle0}`)} />
                <input id="otp-box-1" value={vals.otp1} onChange={vals.onOtp1} onKeyDown={vals.onOtpKey1} inputMode="numeric" maxLength="1" autoComplete="off" style={css(`${vals.otpBoxStyle1}`)} />
                <input id="otp-box-2" value={vals.otp2} onChange={vals.onOtp2} onKeyDown={vals.onOtpKey2} inputMode="numeric" maxLength="1" autoComplete="off" style={css(`${vals.otpBoxStyle2}`)} />
                <input id="otp-box-3" value={vals.otp3} onChange={vals.onOtp3} onKeyDown={vals.onOtpKey3} inputMode="numeric" maxLength="1" autoComplete="off" style={css(`${vals.otpBoxStyle3}`)} />
              </div>

              <div style={css(`text-align:center;font:500 12px 'Inter';color:#9A93A6`)}>Didn't get a code? <span style={css(`color:var(--p,#7D1535);font-weight:700;cursor:pointer`)}>Resend</span></div>
            </div>

            <div style={css(`position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px;z-index:45`)}>
              <button onClick={vals.confirmOtp} disabled={vals.otpIncomplete} style={css(`${vals.confirmOtpStyle}`)}>Confirm OTP</button>
            </div>
          </div>
          </> ) : null}

          
          { (vals.isLocation) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;padding-bottom:28px`)}>
            <div style={css(`position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF`)}>
              <button onClick={vals.goHome} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
              <span style={css(`font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px`)}>Choose location</span>
            </div>

            <div style={css(`padding:16px 22px 0`)}>
              <div style={css(`display:flex;align-items:center;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:12px 14px`)}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#B0A9BC" strokeWidth="2.2"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4-4"></path></svg>
                <span style={css(`font:500 13px 'Inter';color:#A39BB0`)}>Search for area, street name…</span>
              </div>

              <button onClick={vals.useSavedLocation} style={css(`display:flex;align-items:center;gap:11px;width:100%;text-align:left;background:var(--psoft,#F7E9EC);border:1px solid var(--pborder,#EAC9D1);border-radius:var(--radM,14px);padding:13px 14px;cursor:pointer;margin-top:14px`)}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.1"><path d="M12 2v3M12 19v3M2 12h3M19 12h3"></path><circle cx="12" cy="12" r="4"></circle></svg>
                <div style={css(`flex:1`)}><div style={css(`font:700 13px var(--display,'Space Grotesk');color:var(--p,#7D1535)`)}>Use current location</div><div style={css(`font:500 11px 'Inter';color:#B07A88;margin-top:2px`)}>Detect via GPS</div></div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C99AA6" strokeWidth="2.4"><path d="m9 18 6-6-6-6"></path></svg>
              </button>

              <div style={css(`display:flex;align-items:center;gap:11px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,14px);padding:13px 14px;margin-top:11px`)}>
                <div style={css(`width:36px;height:36px;border-radius:10px;background:#F4EEE7;display:flex;align-items:center;justify-content:center;flex-shrink:0`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.1"><path d="M3 21h18M5 21V10M19 21V10M3 10l9-6 9 6M9 21v-6h6v6"></path></svg></div>
                <div style={css(`flex:1;min-width:0`)}><div style={css(`font:700 12.5px var(--display,'Space Grotesk');color:#3B2630`)}>Saved address</div><div style={css(`font:500 11px 'Inter';color:#9A93A6;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>{vals.savedAddrLine}</div></div>
              </div>

              <div style={css(`font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1px;color:#A39BB0;text-transform:uppercase;margin:22px 0 4px`)}>Popular areas</div>
              { arr(vals.locationOptions).map((loc, _k22) => ( <Fragment key={_k22}>
                <button onClick={loc.onClick} style={css(`${loc.rowStyle}`)}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.1" style={css(`flex-shrink:0`)}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="2.6"></circle></svg>
                  <span style={css(`flex:1;font:600 13px 'Inter';color:#3B2630`)}>{loc.label}</span>
                  { (loc.active) ? ( <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.6"><path d="m5 12 5 5 9-10"></path></svg></> ) : null}
                </button>
              </Fragment> )) }
            </div>
          </div>
          </> ) : null}

          
          { (vals.isVendor) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%`)}>
            
            <div style={css(`position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;padding:10px 18px;background:rgba(251,250,247,.86);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF`)}>
              <button onClick={vals.goHome} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg>
              </button>
              <span style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630`)}>{vals.vName}</span>
              <button style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"></path></svg>
              </button>
            </div>

            
            <div style={css(`position:relative;height:180px;margin-top:-1px;overflow:hidden;background:#EEE9E0`)}>
              <div style={css(`position:absolute;inset:0;background:#EEE9E0 center/cover no-repeat;background-image:url(${vals.vPhoto});animation:rasaZoom 15s ease-in-out infinite alternate`)}></div>
              <div style={css(`position:absolute;top:0;bottom:0;left:0;width:36%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.28),transparent);animation:rasaShine 7.5s ease-in-out infinite;pointer-events:none`)}></div>
              <div style={css(`position:absolute;inset:0;background:linear-gradient(to top,rgba(251,250,247,1),rgba(251,250,247,0) 60%);pointer-events:none`)}></div>
            </div>

            
            <div style={css(`padding:0 22px;margin-top:-6px;position:relative`)}>
              <div style={css(`display:flex;justify-content:space-between;align-items:flex-start;gap:12px`)}>
                <div>
                  <div style={css(`font:700 22px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.4px`)}>{vals.vName}</div>
                  <div style={css(`font:500 12.5px 'Inter';color:#9A93A6;margin-top:3px`)}>{vals.vCuisine} · {vals.vPrice}</div>
                  <div style={css(`display:flex;align-items:center;gap:5px;margin-top:6px`)}>
                    <span style={css(`font:600 11px 'Inter';color:#2F9E6E`)}>●</span>
                    <span style={css(`font:600 11.5px 'Inter';color:#6F6A7D`)}>{vals.vOpen}</span>
                  </div>
                </div>
                <div style={css(`text-align:center;background:var(--psoft,#F7E9EC);border-radius:var(--radM,14px);padding:9px 11px;flex-shrink:0`)}>
                  <div style={css(`font:700 16px var(--display,'Space Grotesk');color:var(--p,#7D1535)`)}>{vals.vRating} ★</div>
                  <div style={css(`font:600 8.5px 'JetBrains Mono',monospace;color:#B98A98;letter-spacing:.5px;margin-top:2px`)}>{vals.vRatings}</div>
                </div>
              </div>

              
              <button onClick={vals.goQueue} style={css(`width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:16px;background:linear-gradient(135deg,var(--a,#9BAA5C),var(--a2,#7F8E46));border:none;border-radius:var(--radL,18px);padding:14px 16px;cursor:pointer`)}>
                <div style={css(`display:flex;align-items:center;gap:11px`)}>
                  <div style={css(`width:38px;height:38px;border-radius:12px;background:rgba(255,255,255,.22);display:flex;align-items:center;justify-content:center`)}>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>
                  </div>
                  <div style={css(`text-align:left`)}>
                    <div style={css(`font:700 13.5px var(--display,'Space Grotesk');color:#fff`)}>Live queue · {vals.vWait} min</div>
                    <div style={css(`font:500 11px 'Inter';color:rgba(255,255,255,.85)`)}>Tap to track in real time</div>
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4"><path d="m9 18 6-6-6-6"></path></svg>
              </button>

              
              <div style={css(`display:flex;gap:9px;margin-top:12px`)}>
                <button style={css(`flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:11px 0;cursor:pointer;font:600 12px 'Inter';color:#5A5368`)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="2.6"></circle></svg>Directions</button>
                <button style={css(`flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:11px 0;cursor:pointer;font:600 12px 'Inter';color:#5A5368`)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"></path></svg>Call</button>
                <button style={css(`flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);padding:11px 0;cursor:pointer;font:600 12px 'Inter';color:#5A5368`)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>Save</button>
              </div>
            </div>

            
            <div style={css(`display:flex;margin-top:18px;border-bottom:1px solid #EFE9DF;background:#FAF6F3;position:sticky;top:57px;z-index:30`)}>
              <button onClick={vals.onTabMenu} style={css(`${vals.tMenu}`)}>Menu</button>
              <button onClick={vals.onTabOffers} style={css(`${vals.tOffers}`)}>Offers</button>
              <button onClick={vals.onTabReviews} style={css(`${vals.tReviews}`)}>Reviews</button>
              <button onClick={vals.onTabAbout} style={css(`${vals.tAbout}`)}>About</button>
            </div>

            <div style={css(`padding:18px 22px 0;flex:1`)}>
              
              { (vals.showMenu) ? ( <>
                { arr(vals.menuGroups).map((grp, _k23) => ( <Fragment key={_k23}>
                  <div style={css(`margin-bottom:22px`)}>
                    <div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630;border-left:3px solid var(--p,#7D1535);padding-left:9px;margin-bottom:13px`)}>{grp.cat}</div>
                    { arr(grp.items).map((item, _k24) => ( <Fragment key={_k24}>
                      <div style={css(`display:flex;gap:13px;align-items:center;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:11px;margin-bottom:11px`)}>
                        <div style={css(`width:66px;height:66px;border-radius:var(--radM,13px);flex-shrink:0;background:#EEE9E0 center/cover no-repeat;background-image:url(${item.img})`)}></div>
                        <div style={css(`flex:1;min-width:0`)}>
                          <div style={css(`font:700 13px var(--display,'Space Grotesk');color:#3B2630`)}>{item.name}</div>
                          <div style={css(`font:700 12.5px var(--display,'Space Grotesk');color:var(--p,#7D1535);margin-top:3px`)}>{item.priceLabel}</div>
                          <div style={css(`font:500 11px 'Inter';color:#9A93A6;margin-top:5px;line-height:1.45`)}>{item.desc}</div>
                          { (item.showStock) ? ( <><div style={css(`${item.stockStyle}`)}><span style={css(`width:5px;height:5px;border-radius:50%;background:currentColor;animation:rasaPulse 1.4s infinite`)}></span>{item.stockLabel}</div></> ) : null}
                        </div>
                        <div style={css(`flex-shrink:0;align-self:center`)}>
                          { (item.notInCart) ? ( <>
                            <button onClick={item.onAdd} style={css(`display:inline-flex;align-items:center;gap:5px;background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);border:1px solid var(--pborder,#EAC9D1);border-radius:9px;padding:6px 13px;cursor:pointer;font:700 11px 'Inter'`)}>＋ Add</button>
                          </> ) : null}
                          { (item.inCart) ? ( <>
                            <div style={css(`display:inline-flex;align-items:center;gap:14px;background:var(--p,#7D1535);border-radius:9px;padding:6px 12px`)}>
                              <button onClick={item.onRemove} style={css(`background:none;border:none;color:#fff;cursor:pointer;font-size:15px;line-height:1;display:flex`)}>−</button>
                              <span style={css(`font:700 12px 'Inter';color:#fff`)}>{item.qty}</span>
                              <button onClick={item.onAdd} style={css(`background:none;border:none;color:#fff;cursor:pointer;font-size:15px;line-height:1;display:flex`)}>＋</button>
                            </div>
                          </> ) : null}
                        </div>
                      </div>
                    </Fragment> )) }
                  </div>
                </Fragment> )) }
              </> ) : null}

              
              { (vals.showOffers) ? ( <>
                <div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:12px`)}>Available offers</div>
                <div style={css(`background:linear-gradient(135deg,var(--p,#7D1535),var(--p2,#9E2A48));border-radius:var(--radL,18px);padding:16px;display:flex;align-items:center;justify-content:space-between;margin-bottom:11px`)}>
                  <div style={css(`display:flex;align-items:center;gap:12px`)}>
                    <div style={css(`width:40px;height:40px;border-radius:12px;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font:700 16px var(--display,'Space Grotesk');color:#fff`)}>%</div>
                    <div><div style={css(`font:700 14px var(--display,'Space Grotesk');color:#fff`)}>Get 20% OFF</div><div style={css(`font:500 11px 'Inter';color:rgba(255,255,255,.8)`)}>On orders above {vals.offerMin}</div></div>
                  </div>
                  <span style={css(`font:700 11px 'Inter';color:#fff;background:rgba(255,255,255,.18);padding:6px 11px;border-radius:8px`)}>APPLY</span>
                </div>
                <div style={css(`background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:16px;display:flex;align-items:center;gap:12px;margin-bottom:22px`)}>
                  <div style={css(`width:40px;height:40px;border-radius:12px;background:var(--asoft,#EEF1DC);display:flex;align-items:center;justify-content:center`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--a,#9BAA5C)" strokeWidth="2.2"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 2.8 12V4.8A2 2 0 0 1 4.8 2.8H12a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.8Z"></path><circle cx="7.5" cy="7.5" r="1.5" fill="var(--a,#9BAA5C)"></circle></svg></div>
                  <div><div style={css(`font:700 13px var(--display,'Space Grotesk');color:#3B2630`)}>Flat {vals.cb} cashback</div><div style={css(`font:500 11px 'Inter';color:#9A93A6;margin-top:2px`)}>First 3 visits paying via UPI</div></div>
                </div>

                <div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:12px`)}>Your order</div>
                <div style={css(`background:#fff;border:1px dashed #D9D1E6;border-radius:var(--radL,18px);padding:16px`)}>
                  { arr(vals.cartLines).map((ln, _k25) => ( <Fragment key={_k25}>
                    <div style={css(`display:flex;justify-content:space-between;font:500 12.5px 'Inter';color:#5A5368;margin-bottom:8px`)}><span>{ln.label}</span><span style={css(`font-weight:700;color:#3B2630`)}>{ln.amt}</span></div>
                  </Fragment> )) }
                  <div style={css(`border-top:1px solid #EFE9DF;margin-top:6px;padding-top:11px;display:flex;justify-content:space-between;font:700 13px var(--display,'Space Grotesk');color:#3B2630`)}><span>Subtotal</span><span>{vals.subtotalLabel}</span></div>
                </div>
              </> ) : null}

              
              { (vals.showReviews) ? ( <>
                <div style={css(`display:flex;align-items:center;gap:14px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:16px;margin-bottom:16px`)}>
                  <div style={css(`text-align:center`)}><div style={css(`font:700 32px var(--display,'Space Grotesk');color:var(--p,#7D1535);line-height:1`)}>{vals.vRating}</div><div style={css(`font:600 11px 'Inter';color:var(--a,#9BAA5C);margin-top:3px`)}>★★★★★</div></div>
                  <div style={css(`font:500 12px 'Inter';color:#9A93A6;line-height:1.5;border-left:1px solid #EFE9DF;padding-left:14px`)}>Based on <b style={css(`color:#3B2630`)}>{vals.vRatings}</b> ratings from verified diners who ordered ahead.</div>
                </div>
                { arr(vals.reviews).map((rv, _k26) => ( <Fragment key={_k26}>
                  <div style={css(`background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:15px;margin-bottom:11px`)}>
                    <div style={css(`display:flex;justify-content:space-between;align-items:center`)}>
                      <div style={css(`display:flex;align-items:center;gap:10px`)}>
                        <div style={css(`width:34px;height:34px;border-radius:50%;background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);display:flex;align-items:center;justify-content:center;font:700 13px var(--display,'Space Grotesk')`)}>{rv.initial}</div>
                        <div><div style={css(`font:700 13px var(--display,'Space Grotesk');color:#3B2630`)}>{rv.author}</div><div style={css(`font:500 10.5px 'Inter';color:#B0A9BC`)}>{rv.date}</div></div>
                      </div>
                      <div style={css(`background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);font:700 11px 'Inter';padding:3px 8px;border-radius:7px`)}>★ {rv.rating}</div>
                    </div>
                    <div style={css(`font:500 12.5px 'Inter';color:#6F6A7D;line-height:1.55;margin-top:11px`)}>{rv.comment}</div>
                  </div>
                </Fragment> )) }
              </> ) : null}

              
              { (vals.showAbout) ? ( <>
                <div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:8px`)}>About</div>
                <div style={css(`font:500 12.5px 'Inter';color:#6F6A7D;line-height:1.65;margin-bottom:20px`)}>{vals.vAbout}</div>
                <div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:10px`)}>Opening hours</div>
                <div style={css(`background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:15px;margin-bottom:20px`)}>
                  <div style={css(`display:flex;justify-content:space-between;font:500 12.5px 'Inter';color:#6F6A7D;margin-bottom:9px`)}><span>Monday – Friday</span><span style={css(`font:500 12px 'JetBrains Mono',monospace;color:#3B2630`)}>{vals.vHoursWk}</span></div>
                  <div style={css(`display:flex;justify-content:space-between;font:500 12.5px 'Inter';color:#6F6A7D`)}><span>Saturday – Sunday</span><span style={css(`font:500 12px 'JetBrains Mono',monospace;color:#3B2630`)}>{vals.vHoursWe}</span></div>
                </div>
                <div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:10px`)}>Contact</div>
                <div style={css(`background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:15px`)}>
                  <div style={css(`display:flex;align-items:center;gap:11px;margin-bottom:13px`)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"></path></svg><span style={css(`font:500 12.5px 'JetBrains Mono',monospace;color:#3B2630`)}>{vals.vPhone}</span></div>
                  <div style={css(`display:flex;align-items:flex-start;gap:11px`)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2" style={css(`margin-top:1px;flex-shrink:0`)}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="2.6"></circle></svg><span style={css(`font:500 12px 'Inter';color:#6F6A7D;line-height:1.5`)}>{vals.vAddress}</span></div>
                </div>
              </> ) : null}
            </div>

            
            <div style={css(`height:74px;flex-shrink:0;margin-top:8px`)}></div>
          </div>
          </> ) : null}

          
          { (vals.isBooking) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%`)}>
            <div style={css(`position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF`)}>
              <button onClick={vals.goOffers} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
              <span style={css(`font:700 19px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.4px`)}>Booking Summary</span>
            </div>

            <div style={css(`padding:18px 22px 0;flex:1`)}>
              
              <div style={css(`margin-bottom:18px`)}>
                { arr(vals.bookingLines).map((bl, _k27) => ( <Fragment key={_k27}>
                  <div style={css(`display:flex;align-items:baseline;gap:10px;margin-bottom:9px`)}>
                    <span style={css(`font:600 12.5px 'Inter';color:#9A93A6;width:24px;flex-shrink:0`)}>{bl.qtyLabel}</span>
                    <span style={css(`flex:1;font:500 13px 'Inter';color:#3B2630`)}>{bl.name}</span>
                    <span style={css(`font:600 12.5px 'JetBrains Mono',monospace;color:#6F6A7D`)}>{bl.amt}</span>
                  </div>
                </Fragment> )) }
              </div>

              
              <div style={css(`background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);overflow:hidden;margin-bottom:24px`)}>
                <div style={css(`display:flex;align-items:center;gap:13px;padding:14px 16px;border-bottom:1px solid #F1EBE3`)}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.1" style={css(`flex-shrink:0`)}><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M16 2v4M8 2v4M3 10h18"></path></svg>
                  <div><div style={css(`font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.6px`)}>Date and Time</div><div style={css(`font:600 13px 'Inter';color:#3B2630;margin-top:3px`)}>Saturday, Oct 14 at 7:00 PM</div></div>
                </div>
                <div style={css(`display:flex;align-items:center;gap:13px;padding:14px 16px;border-bottom:1px solid #F1EBE3`)}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.1" style={css(`flex-shrink:0`)}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="2.6"></circle></svg>
                  <div><div style={css(`font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.6px`)}>Location</div><div style={css(`font:600 13px 'Inter';color:#3B2630;margin-top:3px`)}>{vals.vName}, {vals.vArea}</div></div>
                </div>
                <div style={css(`display:flex;align-items:center;gap:13px;padding:14px 16px;border-bottom:1px solid #F1EBE3`)}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.1" style={css(`flex-shrink:0`)}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path></svg>
                  <div><div style={css(`font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.6px`)}>Number of Items</div><div style={css(`font:600 13px 'Inter';color:#3B2630;margin-top:3px`)}>{vals.bookingCount} Items</div></div>
                </div>
                <div style={css(`display:flex;align-items:center;gap:13px;padding:14px 16px`)}>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.1" style={css(`flex-shrink:0`)}><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 2.8 12V4.8A2 2 0 0 1 4.8 2.8H12a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.8Z"></path><circle cx="7.5" cy="7.5" r="1.5" fill="var(--p,#7D1535)"></circle></svg>
                  <div><div style={css(`font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.6px`)}>Coupons</div><div style={css(`font:600 13px 'Inter';color:#3B2630;margin-top:3px`)}>15% Discount Applied</div></div>
                </div>
              </div>

              
              <div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:12px`)}>Featured Items</div>
              <div className="scr" ref={vals.dragScroll} style={css(`display:flex;gap:13px;overflow-x:auto;margin:0 -22px 24px;padding:0 22px 4px;cursor:grab;scroll-behavior:smooth`)}>
                { arr(vals.featuredItems).map((fi, _k28) => ( <Fragment key={_k28}>
                  <div style={css(`width:188px;flex-shrink:0;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);overflow:hidden`)}>
                    <div style={css(`height:118px;background:#EEE9E0 center/cover no-repeat;background-image:url(${fi.img})`)}></div>
                    <div style={css(`padding:12px 13px 14px`)}>
                      <div style={css(`display:flex;align-items:center;gap:7px`)}><span style={css(`font:700 13px var(--display,'Space Grotesk');color:#3B2630;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>{fi.name}</span>{ (fi.hasBadge) ? ( <><span style={css(`flex-shrink:0;font:700 7.5px 'JetBrains Mono',monospace;letter-spacing:.4px;color:var(--p,#7D1535);background:var(--psoft,#F7E9EC);padding:3px 6px;border-radius:6px`)}>{fi.badge}</span></> ) : null}</div>
                      <div style={css(`font:500 11px 'Inter';color:#9A93A6;margin-top:5px`)}>{fi.note}</div>
                    </div>
                  </div>
                </Fragment> )) }
              </div>

              
              <div style={css(`display:flex;flex-direction:column;gap:10px;margin-bottom:24px`)}>
                <button style={css(`display:flex;align-items:center;gap:13px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,14px);padding:15px;cursor:pointer;text-align:left`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.1"><path d="M4 6h16M4 12h16M4 18h10"></path></svg><span style={css(`flex:1;font:600 13px 'Inter';color:#3B2630`)}>Add a special request</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2.4"><path d="m9 18 6-6-6-6"></path></svg></button>
                <button style={css(`display:flex;align-items:center;gap:13px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,14px);padding:15px;cursor:pointer;text-align:left`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.1"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg><span style={css(`flex:1;font:600 13px 'Inter';color:#3B2630`)}>Modification</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2.4"><path d="m9 18 6-6-6-6"></path></svg></button>
                <button style={css(`display:flex;align-items:center;gap:13px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,14px);padding:15px;cursor:pointer;text-align:left`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.1"><rect x="3" y="4" width="18" height="18" rx="2"></rect><path d="M8 2v4M16 2v4M3 10h18M9 14l6 6M15 14l-6 6"></path></svg><span style={css(`flex:1;font:600 13px 'Inter';color:#3B2630`)}>Cancellation with time constraints</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2.4"><path d="m9 18 6-6-6-6"></path></svg></button>
              </div>

              
              <div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin-bottom:12px`)}>Detailed Summary</div>
              <div style={css(`background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:18px;margin-bottom:8px`)}>
                <div style={css(`display:flex;justify-content:space-between;font:500 13px 'Inter';color:#6F6A7D;margin-bottom:13px`)}><span>Base Rate</span><span style={css(`font:600 13px 'JetBrains Mono',monospace;color:#3B2630`)}>{vals.moneySub}</span></div>
                <div style={css(`display:flex;justify-content:space-between;font:500 13px 'Inter';color:#6F6A7D;margin-bottom:13px`)}><span>Service Fee</span><span style={css(`font:600 13px 'JetBrains Mono',monospace;color:#3B2630`)}>{vals.moneyFee}</span></div>
                <div style={css(`display:flex;justify-content:space-between;font:500 13px 'Inter';color:#2F9E6E;margin-bottom:13px`)}><span>Discount (15%)</span><span style={css(`font:600 13px 'JetBrains Mono',monospace`)}>−{vals.moneyDisc}</span></div>
                <div style={css(`border-top:1px solid #EFE9DF;padding-top:14px;display:flex;justify-content:space-between;align-items:center`)}><span style={css(`font:700 16px var(--display,'Space Grotesk');color:#3B2630`)}>Total</span><span style={css(`font:700 19px var(--display,'Space Grotesk');color:var(--p,#7D1535)`)}>{vals.moneyTotal}</span></div>
                <div style={css(`font:400 10.5px 'Inter';color:#B0A9BC;font-style:italic;margin-top:11px;line-height:1.5`)}>Overall summary line by line provided here for transparency.</div>
              </div>
            </div>

            <div style={css(`position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px;z-index:45`)}>
              <button onClick={vals.goPay} style={css(`width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;font:700 13.5px var(--display,'Space Grotesk');letter-spacing:1px;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:9px`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="M5 12h14M13 6l6 6-6 6"></path></svg> Proceed to Book</button>
            </div>
          </div>
          </> ) : null}

          
          { (vals.isPay) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%`)}>
            <div style={css(`position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;padding:14px 18px 12px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF`)}>
              <div style={css(`display:flex;align-items:center;gap:12px`)}>
                <button onClick={vals.goBooking} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
                <span style={css(`font:700 18px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.4px`)}>Payment Methods</span>
              </div>
              <button style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"></path></svg></button>
            </div>

            <div style={css(`padding:16px 18px 0;flex:1`)}>
              
              <div style={css(`display:flex;align-items:center;gap:14px;background:var(--psoft,#F7E9EC);border:1px solid var(--pborder,#EAC9D1);border-radius:var(--radL,18px);padding:16px;margin-bottom:24px`)}>
                <div style={css(`width:46px;height:46px;border-radius:var(--radM,13px);background:var(--p,#7D1535);display:flex;align-items:center;justify-content:center;flex-shrink:0`)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="3"></rect><path d="M2 10h20"></path></svg></div>
                <div style={css(`flex:1`)}><div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630`)}>Total Balance</div><div style={css(`font:500 11px 'Inter';color:#9A8A8E;margin-top:2px`)}>Available for checkout</div></div>
                <div style={css(`font:700 20px var(--display,'Space Grotesk');color:var(--p,#7D1535)`)}>{vals.balanceLabel}</div>
              </div>

              
              <div style={css(`font:700 11px 'JetBrains Mono',monospace;letter-spacing:.8px;text-transform:uppercase;color:#A39BB0;margin-bottom:11px`)}>Recommended</div>
              <button onClick={vals.payVisa.onClick} style={css(`width:100%;display:flex;align-items:center;gap:13px;background:#fff;border-radius:var(--radL,16px);padding:15px;cursor:pointer;margin-bottom:24px;${vals.payVisa.border}`)}>
                <div style={css(`width:46px;height:46px;border-radius:12px;background:var(--p,#7D1535);display:flex;align-items:center;justify-content:center;flex-shrink:0`)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="3"></rect><path d="M2 10h20"></path></svg></div>
                <div style={css(`flex:1;text-align:left`)}><div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630`)}>Saved Visa Card</div><div style={css(`font:500 12px 'JetBrains Mono',monospace;color:#9A93A6;margin-top:3px`)}>**** 4242</div></div>
                <div style={css(`${vals.payVisa.radioStyle}`)}><span style={css(`color:#fff;font-size:13px;font-weight:700`)}>{vals.payVisa.tick}</span></div>
              </button>

              
              <div style={css(`font:700 11px 'JetBrains Mono',monospace;letter-spacing:.8px;text-transform:uppercase;color:#A39BB0;margin-bottom:11px`)}>Cards</div>
              <button onClick={vals.payMc.onClick} style={css(`width:100%;display:flex;align-items:center;gap:13px;background:#fff;border-radius:var(--radL,16px);padding:15px;cursor:pointer;margin-bottom:11px;${vals.payMc.border}`)}>
                <div style={css(`width:46px;height:46px;border-radius:12px;background:#F4EEE7;display:flex;align-items:center;justify-content:center;flex-shrink:0`)}><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="12" r="6" fill="#C8662A" opacity=".85"></circle><circle cx="15" cy="12" r="6" fill="var(--p,#7D1535)" opacity=".8"></circle></svg></div>
                <div style={css(`flex:1;text-align:left`)}><div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630`)}>Mastercard</div><div style={css(`font:500 12px 'JetBrains Mono',monospace;color:#9A93A6;margin-top:3px`)}>**** 8821</div></div>
                <div style={css(`${vals.payMc.radioStyle}`)}><span style={css(`color:#fff;font-size:13px;font-weight:700`)}>{vals.payMc.tick}</span></div>
              </button>
              <button style={css(`width:100%;display:flex;align-items:center;justify-content:center;gap:8px;background:none;border:1.5px dashed #D6C2C7;border-radius:var(--radL,16px);padding:15px;cursor:pointer;margin-bottom:24px`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.4"><path d="M12 5v14M5 12h14"></path></svg><span style={css(`font:700 13px var(--display,'Space Grotesk');color:var(--p,#7D1535)`)}>Add New Card</span></button>

              
              <div style={css(`font:700 11px 'JetBrains Mono',monospace;letter-spacing:.8px;text-transform:uppercase;color:#A39BB0;margin-bottom:11px`)}>Digital Wallets</div>
              <div style={css(`display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:24px`)}>
                <button onClick={vals.payApple.onClick} style={css(`display:flex;flex-direction:column;align-items:flex-start;gap:16px;background:#fff;border-radius:var(--radL,16px);padding:15px;cursor:pointer;${vals.payApple.border}`)}>
                  <div style={css(`${vals.payApple.radioStyle}`)}><span style={css(`color:#fff;font-size:13px;font-weight:700`)}>{vals.payApple.tick}</span></div>
                  <div style={css(`text-align:left`)}><div style={css(`font:700 13.5px var(--display,'Space Grotesk');color:#3B2630`)}>Apple Pay</div><div style={css(`font:500 11px 'Inter';color:#9A93A6;margin-top:3px`)}>Default</div></div>
                </button>
                <button onClick={vals.payPhonePe.onClick} style={css(`display:flex;flex-direction:column;align-items:flex-start;gap:16px;background:#fff;border-radius:var(--radL,16px);padding:15px;cursor:pointer;${vals.payPhonePe.border}`)}>
                  <div style={css(`${vals.payPhonePe.radioStyle}`)}><span style={css(`color:#fff;font-size:13px;font-weight:700`)}>{vals.payPhonePe.tick}</span></div>
                  <div style={css(`text-align:left`)}><div style={css(`font:700 13.5px var(--display,'Space Grotesk');color:#3B2630`)}>PhonePe</div><div style={css(`font:500 11px 'Inter';color:#9A93A6;margin-top:3px`)}>Connect Wallet</div></div>
                </button>
              </div>

              
              <div style={css(`font:700 11px 'JetBrains Mono',monospace;letter-spacing:.8px;text-transform:uppercase;color:#A39BB0;margin-bottom:11px`)}>Other Methods</div>
              <button onClick={vals.payNet.onClick} style={css(`width:100%;display:flex;align-items:center;gap:13px;background:#fff;border-radius:var(--radL,16px);padding:15px;cursor:pointer;margin-bottom:11px;${vals.payNet.border}`)}>
                <div style={css(`width:46px;height:46px;border-radius:12px;background:#F4EEE7;display:flex;align-items:center;justify-content:center;flex-shrink:0`)}><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.1"><path d="M3 21h18M5 21V10M19 21V10M3 10l9-6 9 6M9 21v-6h6v6"></path></svg></div>
                <div style={css(`flex:1;text-align:left`)}><div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630`)}>Net Banking</div><div style={css(`font:500 11.5px 'Inter';color:#9A93A6;margin-top:3px`)}>Select from 50+ banks</div></div>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2.4"><path d="m9 18 6-6-6-6"></path></svg>
              </button>
              <button onClick={vals.payCash.onClick} style={css(`width:100%;display:flex;align-items:center;gap:13px;background:#fff;border-radius:var(--radL,16px);padding:15px;cursor:pointer;${vals.payCash.border}`)}>
                <div style={css(`width:46px;height:46px;border-radius:12px;background:#F4EEE7;display:flex;align-items:center;justify-content:center;flex-shrink:0`)}><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.1"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2.5"></circle></svg></div>
                <div style={css(`flex:1;text-align:left`)}><div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630`)}>Cash</div><div style={css(`font:500 11.5px 'Inter';color:#9A93A6;margin-top:3px`)}>Pay at delivery</div></div>
                <div style={css(`${vals.payCash.radioStyle}`)}><span style={css(`color:#fff;font-size:13px;font-weight:700`)}>{vals.payCash.tick}</span></div>
              </button>
            </div>

            <div style={css(`position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px;z-index:45`)}>
              <button onClick={vals.goSuccess} style={css(`width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;font:700 14px var(--display,'Space Grotesk');letter-spacing:.3px;cursor:pointer`)}>Pay {vals.moneyTotal}</button>
              <div style={css(`text-align:center;margin-top:10px`)}><span onClick={vals.goFailed} style={css(`font:600 11.5px 'Inter';color:#B0A9BC;cursor:pointer;text-decoration:underline;text-underline-offset:2px`)}>Simulate a declined payment</span></div>
            </div>
          </div>
          </> ) : null}

          
          { (vals.isSuccess) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;padding:0 22px 32px`)}>
            <div style={css(`display:flex;flex-direction:column;align-items:center;text-align:center;padding-top:40px`)}>
              <div style={css(`width:84px;height:84px;border-radius:50%;background:#E4F4EC;display:flex;align-items:center;justify-content:center`)}><div style={css(`width:58px;height:58px;border-radius:50%;background:#2F9E6E;display:flex;align-items:center;justify-content:center`)}><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><path d="m5 12 5 5 9-10"></path></svg></div></div>
              <div style={css(`font:700 23px var(--display,'Space Grotesk');color:#3B2630;margin-top:20px;letter-spacing:-.3px`)}>Payment successful</div>
              <div style={css(`font:500 12.5px 'Inter';color:#9A93A6;margin-top:7px;line-height:1.55;max-width:260px`)}>Your order of <b style={css(`color:#3B2630`)}>{vals.moneyTotal}</b> is confirmed. {vals.vName} has been notified.</div>
            </div>

            <div style={css(`background:#fff;border:1px solid #ECE6DB;border-radius:var(--radXL,20px);padding:17px;margin-top:26px`)}>
              <div style={css(`display:flex;justify-content:space-between;align-items:center;padding-bottom:13px;border-bottom:1px solid #EFE9DF`)}>
                <span style={css(`font:600 10px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.5px`)}>Order receipt</span>
                <span style={css(`font:600 11.5px 'Inter';color:var(--p,#7D1535)`)}>View invoice</span>
              </div>
              <div style={css(`display:flex;align-items:center;justify-content:space-between;margin-top:14px`)}>
                <div><div style={css(`font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase`)}>Order ID</div><div style={css(`font:600 13px 'JetBrains Mono',monospace;color:#3B2630;margin-top:3px`)}>ORD_7829104</div></div>
                <div style={css(`text-align:right`)}><div style={css(`font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase`)}>Paid via</div><div style={css(`font:700 13px var(--display,'Space Grotesk');color:#3B2630;margin-top:3px`)}>{vals.payName}</div></div>
              </div>
              <div style={css(`display:flex;align-items:center;gap:11px;background:#F4EEE7;border:1px solid #EFE9DF;border-radius:var(--radM,13px);padding:11px;margin-top:14px`)}>
                <div style={css(`width:40px;height:40px;border-radius:10px;flex-shrink:0;background:#EEE9E0 center/cover no-repeat;background-image:url(${vals.vPhoto})`)}></div>
                <div><div style={css(`font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase`)}>Vendor</div><div style={css(`font:700 13px var(--display,'Space Grotesk');color:#3B2630;margin-top:2px`)}>{vals.vName}</div></div>
              </div>
            </div>

            <div style={css(`background:var(--psoft,#F7E9EC);border:1px solid var(--pborder,#EAC9D1);border-radius:var(--radL,16px);padding:13px 15px;margin-top:14px;display:flex;align-items:center;gap:11px`)}>
              <div style={css(`width:36px;height:36px;border-radius:11px;background:var(--p,#7D1535);display:flex;align-items:center;justify-content:center;flex-shrink:0`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><path d="M20 12v10H4V12M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg></div>
              <span style={css(`font:500 12px 'Inter';color:#5A5368`)}>You earned <b style={css(`color:var(--p,#7D1535)`)}>40 points</b> — redeem on your next order.</span>
            </div>

            <button onClick={vals.goQueue} style={css(`width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;font:700 13.5px var(--display,'Space Grotesk');letter-spacing:.3px;cursor:pointer;margin-top:22px;display:flex;align-items:center;justify-content:center;gap:8px`)}>Track queue status <span>→</span></button>
            <div style={css(`text-align:center;margin-top:14px`)}><span onClick={vals.goHome} style={css(`font:600 12px 'Inter';color:#9A93A6;cursor:pointer`)}>Back to home</span></div>
          </div>
          </> ) : null}

          
          { (vals.isFailed) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;padding:0 0 32px`)}>
            <div style={css(`display:flex;align-items:center;gap:12px;padding:14px 18px 4px`)}>
              <button onClick={vals.goPay} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
              <span style={css(`font:700 18px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px`)}>Payment failed</span>
            </div>

            <div style={css(`padding:0 22px`)}>
              <div style={css(`display:flex;flex-direction:column;align-items:center;text-align:center;padding-top:18px`)}>
                <div style={css(`width:150px;height:150px;border-radius:50%;background:#FCEBEE;display:flex;align-items:center;justify-content:center`)}><div style={css(`width:104px;height:104px;border-radius:50%;background:#F7D2D9;display:flex;align-items:center;justify-content:center`)}><div style={css(`width:68px;height:68px;border-radius:50%;background:#A01829;display:flex;align-items:center;justify-content:center`)}><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round"><path d="M12 7v6"></path><path d="M12 17h.01"></path></svg></div></div></div>
                <div style={css(`font:700 24px var(--display,'Space Grotesk');color:#3B2630;margin-top:22px;letter-spacing:-.3px`)}>Payment Failed</div>
                <div style={css(`font:500 13px 'Inter';color:#9A93A6;margin-top:9px;line-height:1.6;max-width:280px`)}>We couldn't process your payment of <b style={css(`color:#3B2630`)}>{vals.moneyTotal}</b>. Please check your bank details or try another method.</div>
              </div>

              <div style={css(`background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:17px;margin-top:28px`)}>
                <span style={css(`font:600 10px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.6px`)}>Details</span>
                <div style={css(`display:flex;justify-content:space-between;align-items:center;margin-top:14px;font:500 13px 'Inter';color:#6F6A7D`)}><span>Reason</span><span style={css(`font-weight:700;color:#C0392B`)}>Transaction declined by bank</span></div>
                <div style={css(`display:flex;justify-content:space-between;align-items:center;margin-top:14px;font:500 13px 'Inter';color:#6F6A7D`)}><span>Transaction ID</span><span style={css(`font:600 12.5px 'JetBrains Mono',monospace;color:#3B2630`)}>TXN_9876543210</span></div>
              </div>

              <button onClick={vals.goPay} style={css(`width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:16px;font:700 13px var(--display,'Space Grotesk');letter-spacing:1px;text-transform:uppercase;cursor:pointer;margin-top:26px;display:flex;align-items:center;justify-content:center;gap:9px`)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4"><path d="M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5"></path></svg> Retry Payment</button>
              <button onClick={vals.goPay} style={css(`width:100%;background:var(--pchip,#F1DEE3);color:var(--p,#7D1535);border:none;border-radius:var(--radL,16px);padding:16px;font:700 12.5px var(--display,'Space Grotesk');letter-spacing:.8px;text-transform:uppercase;cursor:pointer;margin-top:12px`)}>Change Payment Method</button>
              <div style={css(`display:flex;align-items:center;justify-content:center;gap:7px;margin-top:24px;cursor:pointer`)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.1"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg><span style={css(`font:600 12.5px 'Inter';color:var(--p,#7D1535)`)}>Contact Support</span></div>
            </div>
          </div>
          </> ) : null}

          
          { (vals.isQueue) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%`)}>
            <div style={css(`position:sticky;top:0;z-index:40;display:flex;align-items:center;gap:12px;padding:12px 18px;background:rgba(251,250,247,.9);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF`)}>
              <button onClick={vals.goVendor} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
              <span style={css(`font:700 16px var(--display,'Space Grotesk');color:#3B2630`)}>Live queue</span>
            </div>

            <div style={css(`padding:18px 22px 0;flex:1`)}>
              <div style={css(`position:relative;border-radius:var(--radXL,20px);overflow:hidden;height:120px;background:#EEE9E0`)}>
                <div style={css(`position:absolute;inset:0;background:#EEE9E0 center/cover no-repeat;background-image:url(${vals.vPhoto});animation:rasaZoom 16s ease-in-out infinite alternate`)}></div>
                <div style={css(`position:absolute;inset:0;background:linear-gradient(to top,rgba(22,19,32,.8) 0%,rgba(22,19,32,0) 62%);display:flex;flex-direction:column;justify-content:flex-end;padding:15px`)}>
                  <div style={css(`font:700 17px var(--display,'Space Grotesk');color:#fff`)}>{vals.vName}</div>
                  <div style={css(`font:500 11.5px 'Inter';color:rgba(255,255,255,.82);margin-top:2px`)}>Your order is being prepared</div>
                </div>
              </div>

              
              <div style={css(`background:var(--pdeep,#5E1029);border-radius:var(--radXL,20px);padding:16px 17px 15px;margin-top:14px;overflow:hidden;position:relative`)}>
                <div style={css(`position:absolute;top:0;bottom:0;left:0;width:34%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.07),transparent);animation:rasaShine 5s ease-in-out infinite;pointer-events:none`)}></div>
                <div style={css(`display:flex;align-items:flex-start;justify-content:space-between;position:relative`)}>
                  <div>
                    <div style={css(`display:flex;align-items:center;gap:6px`)}><span style={css(`width:6px;height:6px;border-radius:50%;background:var(--alite,#C2D89B);animation:rasaPulse 1.1s infinite`)}></span><span style={css(`font:600 8px 'JetBrains Mono',monospace;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.6px`)}>Now serving at counter</span></div>
                    <div style={css(`font:700 32px var(--display,'Space Grotesk');color:#fff;margin-top:6px;line-height:1;letter-spacing:.5px`)}>{vals.servingLabel}</div>
                  </div>
                  <div style={css(`text-align:right;background:rgba(155,170,92,.18);border:1px solid rgba(155,170,92,.4);border-radius:12px;padding:7px 11px`)}>
                    <div style={css(`font:600 8px 'JetBrains Mono',monospace;color:rgba(255,255,255,.55);text-transform:uppercase;letter-spacing:.6px`)}>Your token</div>
                    <div style={css(`font:700 19px var(--display,'Space Grotesk');color:var(--a,#9BAA5C);margin-top:2px;line-height:1`)}>{vals.yourTokenLabel}</div>
                  </div>
                </div>
                <div style={css(`margin-top:13px;display:flex;align-items:center;gap:9px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:10px 12px;position:relative`)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--alite,#C2D89B)" strokeWidth="2.2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path></svg>
                  <span style={css(`font:600 12px 'Inter';color:rgba(255,255,255,.9)`)}>{vals.aheadLabel}</span>
                  <span style={css(`margin-left:auto;display:flex;align-items:center;gap:5px`)}><span style={css(`width:5px;height:5px;border-radius:50%;background:var(--alite,#C2D89B);animation:rasaPulse 1.1s infinite`)}></span><span style={css(`font:700 8.5px 'JetBrains Mono',monospace;color:var(--alite,#C2D89B);text-transform:uppercase;letter-spacing:.6px`)}>Live</span></span>
                </div>
              </div>

              
              <div style={css(`display:grid;grid-template-columns:1.15fr .85fr;gap:11px;margin-top:14px`)}>
                <div style={css(`background:#fff;border:1px solid #ECE6DB;border-radius:var(--radXL,20px);padding:16px;overflow:hidden`)}>
                  <div style={css(`display:flex;align-items:center;justify-content:space-between`)}>
                    <div style={css(`font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.5px`)}>Estimated wait</div>
                    <div style={css(`width:30px;height:30px;border-radius:50%;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center`)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2" style={css(`animation:rasaSpin 8s linear infinite`)}><path d="M5 22h14M5 2h14M17 22v-4.2a2 2 0 0 0-.6-1.4L12 12l-4.4 4.4a2 2 0 0 0-.6 1.4V22M7 2v4.2a2 2 0 0 0 .6 1.4L12 12l4.4-4.4a2 2 0 0 0 .6-1.4V2"></path></svg></div>
                  </div>
                  <div style={css(`font:700 38px var(--display,'Space Grotesk');color:#3B2630;margin-top:18px;line-height:1;letter-spacing:1px`)}>{vals.qTime}</div>
                  <div style={css(`font:500 10px 'Inter';color:#9A93A6;margin-top:6px`)}>minutes remaining</div>
                </div>
                <div style={css(`background:#fff;border:1px solid #ECE6DB;border-radius:var(--radXL,20px);padding:16px;display:flex;flex-direction:column;align-items:flex-start;justify-content:space-between`)}>
                  <div style={css(`display:flex;align-items:center;justify-content:space-between;width:100%`)}>
                    <div style={css(`font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.5px`)}>Leave in</div>
                    <div style={css(`width:30px;height:30px;border-radius:50%;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center`)}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2"><circle cx="5.5" cy="17.5" r="3.5"></circle><circle cx="18.5" cy="17.5" r="3.5"></circle><path d="M15 17.5h-3.8l-2-7H5.5M9 6h4l2 5"></path></svg></div>
                  </div>
                  <div style={css(`margin-top:auto`)}>
                    <div style={css(`font:700 24px var(--display,'Space Grotesk');color:#3B2630;line-height:1;margin-top:18px`)}>{vals.leaveBigLabel}</div>
                    <div style={css(`font:500 10px 'Inter';color:#9A93A6;margin-top:5px`)}>{vals.leaveSub}</div>
                  </div>
                </div>
              </div>

              
              <div style={css(`background:#fff;border:1px solid #ECE6DB;border-radius:var(--radXL,20px);padding:20px 18px;margin-top:14px;position:relative`)}>
                <div style={css(`position:absolute;left:36px;top:30px;bottom:30px;width:2px;background:#EFE9DF`)}></div>
                <div style={css(`display:flex;align-items:center;justify-content:space-between;position:relative;margin-bottom:22px`)}>
                  <div style={css(`display:flex;align-items:center;gap:13px`)}><div style={css(`width:36px;height:36px;border-radius:11px;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center;z-index:1`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg></div><span style={css(`font:700 12.5px var(--display,'Space Grotesk');color:#3B2630`)}>In the queue</span></div>
                  <div style={css(`width:18px;height:18px;border-radius:50%;background:var(--p,#7D1535);display:flex;align-items:center;justify-content:center`)}><div style={css(`width:6px;height:6px;border-radius:50%;background:#fff`)}></div></div>
                </div>
                <div style={css(`display:flex;align-items:center;justify-content:space-between;position:relative;margin-bottom:22px`)}>
                  <div style={css(`display:flex;align-items:center;gap:13px`)}><div style={css(`width:36px;height:36px;border-radius:11px;background:#F4EEE7;display:flex;align-items:center;justify-content:center;z-index:1`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2.2"><rect x="2" y="5" width="20" height="14" rx="3"></rect><path d="M2 10h20"></path></svg></div><span style={css(`font:600 12.5px 'Inter';color:#B0A9BC`)}>Payment Zone</span></div>
                  <div style={css(`width:16px;height:16px;border-radius:50%;border:2px solid #E2DCEA;background:#fff;z-index:1`)}></div>
                </div>
                <div style={css(`display:flex;align-items:center;justify-content:space-between;position:relative`)}>
                  <div style={css(`display:flex;align-items:center;gap:13px`)}><div style={css(`width:36px;height:36px;border-radius:11px;background:#F4EEE7;display:flex;align-items:center;justify-content:center;z-index:1`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2.2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18M16 10a4 4 0 0 1-8 0"></path></svg></div><span style={css(`font:600 12.5px 'Inter';color:#B0A9BC`)}>Rasa Zone</span></div>
                  <div style={css(`width:16px;height:16px;border-radius:50%;border:2px solid #E2DCEA;background:#fff;z-index:1`)}></div>
                </div>
              </div>

              
              <div style={css(`display:flex;align-items:baseline;justify-content:space-between;margin-top:22px;margin-bottom:12px`)}>
                <div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630`)}>Add more from {vals.vName}</div>
                <span onClick={vals.goVendor} style={css(`font:600 11.5px 'Inter';color:var(--p,#7D1535);cursor:pointer`)}>Full menu</span>
              </div>
              <div className="scr" ref={vals.dragScroll} style={css(`display:flex;gap:12px;overflow-x:auto;margin:0 -22px;padding:0 22px 4px;cursor:grab;scroll-behavior:smooth`)}>
                { arr(vals.queueItems).map((qi, _k29) => ( <Fragment key={_k29}>
                  <div style={css(`width:148px;flex-shrink:0;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);overflow:hidden`)}>
                    <div style={css(`height:96px;background:#EEE9E0 center/cover no-repeat;background-image:url(${qi.img})`)}></div>
                    <div style={css(`padding:10px 11px 11px`)}>
                      <div style={css(`font:700 12px var(--display,'Space Grotesk');color:#3B2630;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>{qi.name}</div>
                      <div style={css(`display:flex;align-items:center;justify-content:space-between;margin-top:8px`)}>
                        <span style={css(`font:700 12px var(--display,'Space Grotesk');color:#3B2630`)}>{qi.priceLabel}</span>
                        <button onClick={qi.onAdd} style={css(`background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);border:1px solid var(--pborder,#EAC9D1);border-radius:8px;padding:4px 11px;cursor:pointer;font:700 11px 'Inter'`)}>＋ Add</button>
                      </div>
                    </div>
                  </div>
                </Fragment> )) }
              </div>

              
              <div style={css(`background:#F4EEE7;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:14px;margin-top:18px`)}>
                <div style={css(`display:flex;align-items:center;gap:8px`)}>
                  <div style={css(`width:26px;height:26px;border-radius:8px;background:var(--asoft,#EEF1DC);display:flex;align-items:center;justify-content:center;flex-shrink:0`)}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--a2,#7F8E46)" strokeWidth="2.2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z"></path><path d="M6 2v2M10 2v2M14 2v2"></path></svg></div>
                  <div><div style={css(`font:700 13px var(--display,'Space Grotesk');color:#3B2630`)}>Make it a combo</div><div style={css(`font:500 10.5px 'Inter';color:#9A93A6`)}>Goes well with your {vals.comboAnchor} · 10% off</div></div>
                </div>
                <div className="scr" ref={vals.dragScroll} style={css(`display:flex;gap:11px;overflow-x:auto;margin:13px -14px 0;padding:0 14px 2px;cursor:grab;scroll-behavior:smooth`)}>
                  { arr(vals.comboItems).map((ci, _k30) => ( <Fragment key={_k30}>
                    <div style={css(`width:140px;flex-shrink:0;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,14px);overflow:hidden`)}>
                      <div style={css(`position:relative;height:84px;background:#EEE9E0 center/cover no-repeat;background-image:url(${ci.img})`)}>
                        <span style={css(`position:absolute;top:7px;left:7px;font:700 8px 'JetBrains Mono',monospace;letter-spacing:.4px;color:#fff;background:var(--a2,#7F8E46);padding:3px 6px;border-radius:6px`)}>COMBO −10%</span>
                      </div>
                      <div style={css(`padding:9px 10px 10px`)}>
                        <div style={css(`font:700 11.5px var(--display,'Space Grotesk');color:#3B2630;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>{ci.name}</div>
                        <div style={css(`display:flex;align-items:center;justify-content:space-between;margin-top:7px`)}>
                          <span style={css(`display:flex;align-items:baseline;gap:5px`)}><span style={css(`font:700 12px var(--display,'Space Grotesk');color:var(--p,#7D1535)`)}>{ci.comboLabel}</span><span style={css(`font:500 9.5px 'Inter';color:#B0A9BC;text-decoration:line-through`)}>{ci.priceLabel}</span></span>
                          <button onClick={ci.onAdd} style={css(`background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);border:1px solid var(--pborder,#EAC9D1);border-radius:8px;padding:3px 9px;cursor:pointer;font:700 11px 'Inter'`)}>＋</button>
                        </div>
                      </div>
                    </div>
                  </Fragment> )) }
                </div>
              </div>

              
              <div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin-top:24px;margin-bottom:13px`)}>Full menu</div>
              { arr(vals.menuGroups).map((grp, _k31) => ( <Fragment key={_k31}>
                <div style={css(`margin-bottom:22px`)}>
                  <div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630;border-left:3px solid var(--p,#7D1535);padding-left:9px;margin-bottom:13px`)}>{grp.cat}</div>
                  { arr(grp.items).map((item, _k32) => ( <Fragment key={_k32}>
                    <div style={css(`display:flex;gap:13px;align-items:center;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:11px;margin-bottom:11px`)}>
                      <div style={css(`width:66px;height:66px;border-radius:var(--radM,13px);flex-shrink:0;background:#EEE9E0 center/cover no-repeat;background-image:url(${item.img})`)}></div>
                      <div style={css(`flex:1;min-width:0`)}>
                        <div style={css(`font:700 13px var(--display,'Space Grotesk');color:#3B2630`)}>{item.name}</div>
                        <div style={css(`font:700 12.5px var(--display,'Space Grotesk');color:var(--p,#7D1535);margin-top:3px`)}>{item.priceLabel}</div>
                        <div style={css(`font:500 11px 'Inter';color:#9A93A6;margin-top:5px;line-height:1.45`)}>{item.desc}</div>
                        { (item.showStock) ? ( <><div style={css(`${item.stockStyle}`)}><span style={css(`width:5px;height:5px;border-radius:50%;background:currentColor;animation:rasaPulse 1.4s infinite`)}></span>{item.stockLabel}</div></> ) : null}
                      </div>
                      <div style={css(`flex-shrink:0;align-self:center`)}>
                        { (item.notInCart) ? ( <>
                          <button onClick={item.onAdd} style={css(`display:inline-flex;align-items:center;gap:5px;background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);border:1px solid var(--pborder,#EAC9D1);border-radius:9px;padding:6px 13px;cursor:pointer;font:700 11px 'Inter'`)}>＋ Add</button>
                        </> ) : null}
                        { (item.inCart) ? ( <>
                          <div style={css(`display:inline-flex;align-items:center;gap:14px;background:var(--p,#7D1535);border-radius:9px;padding:6px 12px`)}>
                            <button onClick={item.onRemove} style={css(`background:none;border:none;color:#fff;cursor:pointer;font-size:15px;line-height:1;display:flex`)}>−</button>
                            <span style={css(`font:700 12px 'Inter';color:#fff`)}>{item.qty}</span>
                            <button onClick={item.onAdd} style={css(`background:none;border:none;color:#fff;cursor:pointer;font-size:15px;line-height:1;display:flex`)}>＋</button>
                          </div>
                        </> ) : null}
                      </div>
                    </div>
                  </Fragment> )) }
                </div>
              </Fragment> )) }
            </div>

            <div style={css(`position:sticky;bottom:0;left:0;right:0;background:rgba(251,250,247,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px;display:flex;gap:11px;z-index:45;margin-top:14px`)}>
              <button onClick={vals.goOffers} style={css(`flex:1;display:flex;align-items:center;justify-content:space-between;gap:10px;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:15px 18px;cursor:pointer;box-shadow:0 6px 18px -6px rgba(125,21,53,.55)`)}>
                <span style={css(`display:flex;align-items:center;gap:9px`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2"><rect x="2" y="5" width="20" height="14" rx="3"></rect><path d="M2 10h20"></path></svg><span style={css(`display:flex;flex-direction:column;align-items:flex-start;line-height:1.15`)}><span style={css(`font:700 14px var(--display,'Space Grotesk');letter-spacing:.2px`)}>Pay bill</span><span style={css(`font:600 10px 'Inter';color:rgba(255,255,255,.78)`)}>Settle at the counter</span></span></span>
                <span style={css(`display:flex;align-items:center;gap:8px;font:700 15px var(--display,'Space Grotesk')`)}>{vals.moneyTotal} <span style={css(`font-size:16px`)}>→</span></span>
              </button>
            </div>
          </div>
          </> ) : null}

          
          { (vals.isProfile) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;padding-bottom:28px`)}>
            <div style={css(`display:flex;align-items:center;justify-content:space-between;padding:10px 18px 6px`)}>
              <button onClick={vals.goHome} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
              <span style={css(`font:700 16px var(--display,'Space Grotesk');color:var(--p,#7D1535);letter-spacing:-.2px`)}>Profile</span>
              <button onClick={vals.goSupport} aria-label="Customer care" style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.1"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg></button>
            </div>

            
            <div style={css(`display:flex;flex-direction:column;align-items:center;text-align:center;padding:14px 22px 0`)}>
              <div style={css(`position:relative`)}>
                <div style={css(`width:96px;height:96px;border-radius:50%;background:#EEE9E0 center/cover no-repeat;background-image:url(data:image/jpeg;base64,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);border:3px solid #fff;box-shadow:0 6px 18px -8px rgba(60,40,20,.4)`)}></div>
                <button style={css(`position:absolute;right:-2px;bottom:-2px;width:30px;height:30px;border-radius:50%;background:var(--p,#7D1535);border:3px solid #FAF6F3;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"></path></svg></button>
              </div>
              <div style={css(`font:700 22px var(--display,'Space Grotesk');color:#3B2630;margin-top:14px;letter-spacing:-.3px`)}>Ananya Sharma</div>
              <div style={css(`display:flex;align-items:center;gap:6px;margin-top:8px`)}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z"></path></svg><span style={css(`font:500 12.5px 'Inter';color:#6F6A7D`)}>+91 98765 43210</span></div>
              <div style={css(`display:flex;align-items:center;gap:6px;margin-top:6px`)}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2"><rect x="2" y="4" width="20" height="16" rx="3"></rect><path d="m2 7 10 6 10-6"></path></svg><span style={css(`font:500 12.5px 'Inter';color:#6F6A7D`)}>ananya.sharma@example.com</span></div>
            </div>

            
            <div style={css(`padding:20px 22px 0`)}>
              <button onClick={vals.goEditAddress} style={css(`width:100%;display:flex;align-items:center;gap:13px;text-align:left;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:15px;cursor:pointer`)}>
                <div style={css(`width:42px;height:42px;border-radius:12px;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center;flex-shrink:0`)}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="2.6"></circle></svg></div>
                <div style={css(`flex:1;min-width:0`)}><div style={css(`display:flex;align-items:center;gap:7px`)}><span style={css(`font:700 13.5px var(--display,'Space Grotesk');color:#3B2630`)}>Primary Address</span><span style={css(`font:700 8.5px 'JetBrains Mono',monospace;letter-spacing:.4px;text-transform:uppercase;color:var(--p,#7D1535);background:var(--pchip,#F1DEE3);padding:2px 6px;border-radius:5px`)}>{vals.addrLabel}</span></div><div style={css(`font:500 11.5px 'Inter';color:#9A93A6;margin-top:4px;line-height:1.45`)}>{vals.addressDisplay}</div></div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2.4" style={css(`flex-shrink:0`)}><path d="m9 18 6-6-6-6"></path></svg>
              </button>
            </div>

            
            <div style={css(`padding:11px 22px 0`)}>
              <button onClick={vals.goOrders} style={css(`width:100%;display:flex;align-items:center;gap:13px;text-align:left;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:15px;cursor:pointer`)}>
                <div style={css(`width:42px;height:42px;border-radius:12px;background:var(--asoft,#EEF1DC);display:flex;align-items:center;justify-content:center;flex-shrink:0`)}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--a2,#7F8E46)" strokeWidth="2.2"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l3 2"></path></svg></div>
                <div style={css(`flex:1`)}><div style={css(`font:700 13.5px var(--display,'Space Grotesk');color:#3B2630`)}>Order History</div><div style={css(`font:500 11.5px 'Inter';color:#9A93A6;margin-top:3px`)}>Past orders &amp; receipts</div></div>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.2" style={css(`flex-shrink:0`)}><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
              </button>
            </div>

            
            <div style={css(`padding:11px 22px 0`)}>
              <div style={css(`background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);overflow:hidden`)}>
                <button onClick={vals.toggleBank} style={css(`width:100%;display:flex;align-items:center;gap:13px;text-align:left;background:none;border:none;padding:15px;cursor:pointer`)}>
                  <div style={css(`width:42px;height:42px;border-radius:12px;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center;flex-shrink:0`)}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2"><path d="M3 21h18M5 21V10M19 21V10M3 10l9-6 9 6M9 21v-6h6v6"></path></svg></div>
                  <div style={css(`flex:1`)}><div style={css(`font:700 13.5px var(--display,'Space Grotesk');color:#3B2630`)}>Bank Details</div><div style={css(`font:500 11.5px 'Inter';color:#9A93A6;margin-top:3px`)}>UPI &amp; saved cards</div></div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2.4" style={css(`flex-shrink:0;transform:${vals.bankChevron}`)}><path d="m6 9 6 6 6-6"></path></svg>
                </button>
                { (vals.bankOpen) ? ( <>
                  <div style={css(`padding:0 15px 15px`)}>
                    <div style={css(`border-top:1px solid #EFE9DF;padding-top:13px;display:flex;align-items:center;justify-content:space-between`)}><span style={css(`font:500 12px 'Inter';color:#6F6A7D`)}>UPI</span><span style={css(`font:600 12px 'JetBrains Mono',monospace;color:#3B2630`)}>ananya@upi</span></div>
                    <div style={css(`margin-top:11px;display:flex;align-items:center;justify-content:space-between`)}><span style={css(`font:500 12px 'Inter';color:#6F6A7D`)}>Visa</span><span style={css(`font:600 12px 'JetBrains Mono',monospace;color:#3B2630`)}>•••• 4242</span></div>
                  </div>
                </> ) : null}
              </div>
            </div>

            
            <div style={css(`padding:22px 22px 0`)}>
              <div style={css(`font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1.5px;text-transform:uppercase;color:#A39BB0;margin-bottom:6px`)}>General</div>
              <button onClick={vals.goNotifs} style={css(`width:100%;display:flex;align-items:center;gap:13px;background:none;border:none;border-bottom:1px solid #EFE9DF;padding:14px 2px;cursor:pointer;text-align:left`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>
                <span style={css(`flex:1;font:600 13px 'Inter';color:#3B2630`)}>Notifications</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2.4"><path d="m9 18 6-6-6-6"></path></svg>
              </button>
              <button onClick={vals.goLanguage} style={css(`width:100%;display:flex;align-items:center;gap:13px;background:none;border:none;border-bottom:1px solid #EFE9DF;padding:14px 2px;cursor:pointer;text-align:left`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"></path></svg>
                <span style={css(`flex:1;font:600 13px 'Inter';color:#3B2630`)}>Language</span>
                <span style={css(`font:500 11.5px 'Inter';color:#9A93A6`)}>{vals.language}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C3BCCB" strokeWidth="2.4"><path d="m9 18 6-6-6-6"></path></svg>
              </button>
              <button onClick={vals.goLogin} style={css(`width:100%;display:flex;align-items:center;gap:13px;background:none;border:none;padding:16px 2px 6px;cursor:pointer;text-align:left`)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="2.2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"></path></svg>
                <span style={css(`flex:1;font:700 13px 'Inter';color:#C0392B`)}>Logout</span>
              </button>
            </div>
          </div>
          </> ) : null}

          
          { (vals.isOrders) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;padding-bottom:28px`)}>
            <div style={css(`display:flex;align-items:center;justify-content:space-between;padding:10px 18px 4px`)}>
              <button onClick={vals.goProfile} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
              <span style={css(`font:700 17px var(--display,'Space Grotesk');color:#3B2630;letter-spacing:-.3px`)}>Order History</span>
              <button style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.2"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4-4"></path></svg></button>
            </div>

            
            <div style={css(`display:flex;align-items:center;gap:9px;padding:12px 18px 14px;position:relative;z-index:30`)}>
              <button onClick={vals.onTabAll} style={css(`${vals.tabAll}`)}>All Orders</button>
              <button onClick={vals.onTabCancelled} style={css(`${vals.tabCancelled}`)}>Cancelled</button>
              <div style={css(`margin-left:auto;position:relative`)}>
                <button onClick={vals.toggleSort} style={css(`display:flex;align-items:center;gap:6px;background:#fff;border:1px solid #ECE6DB;border-radius:999px;padding:8px 13px;cursor:pointer;font:600 12px 'Inter';color:#3B2630`)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2"><path d="M3 6h18M7 12h10M11 18h2"></path></svg>{vals.sortLabel}
                </button>
                { (vals.sortOpen) ? ( <>
                  <div style={css(`position:absolute;right:0;top:42px;width:180px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,13px);box-shadow:0 12px 30px -10px rgba(60,40,20,.35);overflow:hidden;z-index:40`)}>
                    <div style={css(`font:600 9px 'JetBrains Mono',monospace;color:#A39BB0;text-transform:uppercase;letter-spacing:.6px;padding:10px 13px 4px`)}>Sort by</div>
                    { arr(vals.sortItems).map((si, _k33) => ( <Fragment key={_k33}>
                      <button onClick={si.onClick} style={css(`${si.rowStyle}`)}>{si.label}</button>
                    </Fragment> )) }
                  </div>
                </> ) : null}
              </div>
            </div>

            <div style={css(`padding:0 18px`)}>
              { arr(vals.orders).map((o, _k34) => ( <Fragment key={_k34}>
                <div style={css(`display:flex;gap:13px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:12px;margin-bottom:12px`)}>
                  <div style={css(`width:84px;height:84px;border-radius:var(--radM,14px);flex-shrink:0;background:#EEE9E0 center/cover no-repeat;background-image:url(${o.img})`)}></div>
                  <div style={css(`flex:1;min-width:0`)}>
                    <div style={css(`display:flex;align-items:center;gap:5px`)}>
                      <span style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630;white-space:nowrap;overflow:hidden;text-overflow:ellipsis`)}>{o.name}</span>
                      { (o.verified) ? ( <><svg width="14" height="14" viewBox="0 0 24 24" fill="var(--p,#7D1535)" style={css(`flex-shrink:0`)}><path d="m9 12 2 2 4-4 1.5 1.2L12 17l-4.5-4.5z" fill="#fff"></path><path d="M12 2 9.5 4.5 6 4l-.5 3.5L2 9l1.8 3L2 15l3.5 1.5L6 20l3.5-.5L12 22l2.5-2.5L18 20l.5-3.5L22 15l-1.8-3L22 9l-3.5-1.5L18 4l-3.5.5z"></path><path d="m8.5 12 2.2 2.2L15.5 9.5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"></path></svg></> ) : null}
                    </div>
                    <div style={css(`font:500 11.5px 'Inter';color:#9A93A6;margin-top:3px;line-height:1.35`)}>{o.area}</div>
                    <div style={css(`display:flex;align-items:center;gap:5px;margin-top:7px`)}><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg><span style={css(`font:600 11px 'Inter';color:var(--p,#7D1535)`)}>{o.visitsLabel}</span></div>
                    <div style={css(`font:500 10.5px 'Inter';color:#B0A9BC;margin-top:4px`)}>{o.date}</div>
                    { (o.isCancelled) ? ( <><span style={css(`display:inline-block;margin-top:6px;font:700 9px 'JetBrains Mono',monospace;letter-spacing:.5px;text-transform:uppercase;color:#C0392B;background:#FBE7EC;padding:3px 7px;border-radius:6px`)}>Cancelled</span></> ) : null}
                  </div>
                  <div style={css(`display:flex;flex-direction:column;align-items:flex-end;justify-content:space-between;flex-shrink:0`)}>
                    <div style={css(`font:700 15px var(--display,'Space Grotesk');color:#3B2630`)}>{o.amountLabel}</div>
                    <div style={css(`font:500 10.5px 'Inter';color:#9A93A6`)}>{o.visitsCount}</div>
                    <button onClick={o.onReorder} style={css(`background:var(--psoft,#F7E9EC);color:var(--p,#7D1535);border:1px solid var(--pborder,#EAC9D1);border-radius:9px;padding:6px 13px;cursor:pointer;font:700 11px 'Inter'`)}>Reorder</button>
                  </div>
                </div>
              </Fragment> )) }
            </div>
          </div>
          </> ) : null}

          
          { (vals.isOffers) ? ( <>
          <div style={css(`animation:rasaFade .35s ease;display:flex;flex-direction:column;min-height:100%`)}>
            <div style={css(`position:sticky;top:0;z-index:40;display:flex;align-items:center;justify-content:space-between;padding:12px 18px;background:rgba(250,246,243,.92);backdrop-filter:blur(10px);border-bottom:1px solid #EFE9DF`)}>
              <button onClick={vals.goQueue} style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.4"><path d="m15 18-6-6 6-6"></path></svg></button>
              <span style={css(`font:700 16px var(--display,'Space Grotesk');color:#3B2630`)}>Order Details</span>
              <button style={css(`width:36px;height:36px;border-radius:12px;background:#fff;border:1px solid #ECE6DB;display:flex;align-items:center;justify-content:center;cursor:pointer`)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#3B2630" strokeWidth="2.2"><circle cx="12" cy="12" r="10"></circle><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01"></path></svg></button>
            </div>

            <div style={css(`padding:16px 18px 0;flex:1`)}>
              
              <div style={css(`display:flex;gap:9px;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radM,14px);padding:7px 7px 7px 14px;align-items:center`)}>
                <input value={vals.couponInput} onChange={vals.onCouponInput} placeholder="Enter coupon code" style={css(`flex:1;border:none;outline:none;background:none;font:500 13px 'Inter';color:#3B2630;min-width:0`)} />
                <button onClick={vals.onApplyCoupon} style={css(`background:var(--p,#7D1535);color:#fff;border:none;border-radius:10px;padding:10px 18px;cursor:pointer;font:700 12.5px 'Inter'`)}>Apply</button>
              </div>

              
              <div className="scr" ref={vals.dragScroll} style={css(`display:flex;gap:9px;overflow-x:auto;margin:14px -18px 0;padding:0 18px 2px;cursor:grab`)}>
                { arr(vals.offerChips).map((chip, _k35) => ( <Fragment key={_k35}>
                  <button onClick={chip.onClick} style={css(`${chip.style}`)}>{chip.label}</button>
                </Fragment> )) }
              </div>

              
              { (vals.showBankSection) ? ( <>
                <div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin:22px 0 12px`)}>Bank Offers</div>
                { arr(vals.bankOffers).map((bo, _k36) => ( <Fragment key={_k36}>
                  <div style={css(`background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,18px);padding:15px;margin-bottom:12px`)}>
                    <div style={css(`display:flex;gap:12px`)}>
                      <div style={css(`width:40px;height:40px;border-radius:11px;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center;flex-shrink:0`)}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2"><path d="M3 21h18M5 21V10M19 21V10M3 10l9-6 9 6M9 21v-6h6v6"></path></svg></div>
                      <div style={css(`flex:1;min-width:0`)}>
                        <div style={css(`display:flex;align-items:center;gap:8px`)}><span style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630`)}>{bo.code}</span>{ (bo.hasTag) ? ( <><span style={css(`font:700 8px 'JetBrains Mono',monospace;letter-spacing:.5px;color:var(--adeep,#6E7A38);background:var(--asoft,#EEF1DC);padding:3px 7px;border-radius:6px`)}>{bo.tag}</span></> ) : null}</div>
                        <div style={css(`font:700 12.5px 'Inter';color:#3B2630;margin-top:6px`)}>{bo.title}</div>
                        <div style={css(`font:500 11.5px 'Inter';color:#9A93A6;margin-top:4px;line-height:1.45`)}>{bo.desc}</div>
                      </div>
                    </div>
                    <div style={css(`display:flex;align-items:center;justify-content:space-between;border-top:1px solid #EFE9DF;margin-top:13px;padding-top:13px`)}>
                      <span style={css(`font:600 12px 'Inter';color:var(--p,#7D1535);cursor:pointer`)}>View Details</span>
                      <button onClick={bo.onSelect} style={css(`${bo.selectStyle}`)}>{bo.selectLabel}</button>
                    </div>
                  </div>
                </Fragment> )) }
              </> ) : null}

              
              { (vals.showCouponSection) ? ( <>
                <div style={css(`font:700 14px var(--display,'Space Grotesk');color:#3B2630;margin:22px 0 12px`)}>Available Coupons</div>
                { arr(vals.coupons).map((cp, _k37) => ( <Fragment key={_k37}>
                  <button onClick={cp.onSelect} style={css(`display:flex;align-items:center;gap:13px;width:100%;text-align:left;background:#fff;border:1px solid #ECE6DB;border-radius:var(--radL,16px);padding:14px;margin-bottom:11px;cursor:pointer`)}>
                    <div style={css(`width:42px;height:42px;border-radius:50%;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center;flex-shrink:0`)}><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2"><path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2A2 2 0 0 1 2.8 12V4.8A2 2 0 0 1 4.8 2.8H12a2 2 0 0 1 1.4.6l7.2 7.2a2 2 0 0 1 0 2.8Z"></path><circle cx="7.5" cy="7.5" r="1.5" fill="var(--p,#7D1535)"></circle></svg></div>
                    <div style={css(`flex:1;min-width:0`)}>
                      <div style={css(`display:flex;align-items:center;gap:6px;flex-wrap:wrap`)}><span style={css(`font:600 12px 'Inter';color:#6F6A7D`)}>{cp.label}</span><span style={css(`font:700 12.5px var(--display,'Space Grotesk');color:var(--p,#7D1535)`)}>{cp.code}</span></div>
                      <div style={css(`font:500 11.5px 'Inter';color:#9A93A6;margin-top:4px;line-height:1.45`)}>{cp.desc}</div>
                    </div>
                    <div style={css(`${cp.radioStyle}`)}><span style={css(`color:#fff;font-size:12px;font-weight:700`)}>{cp.tick}</span></div>
                  </button>
                </Fragment> )) }
              </> ) : null}
            </div>

            <div style={css(`position:sticky;bottom:0;left:0;right:0;background:rgba(250,246,243,.96);backdrop-filter:blur(10px);border-top:1px solid #EFE9DF;padding:13px 18px;z-index:45`)}>
              <button onClick={vals.goBooking} style={css(`width:100%;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radL,16px);padding:15px;font:700 14px var(--display,'Space Grotesk');letter-spacing:.3px;cursor:pointer`)}>Next</button>
            </div>
          </div>
          </> ) : null}

        </div>

        
        { (vals.isVendor) ? ( <>
          
          <div onClick={vals.closeQueueSheet} style={css(`${vals.sheetOverlayStyle}`)}></div>
          
          <div style={css(`${vals.sheetStyle}`)}>
            <div style={css(`width:40px;height:5px;border-radius:999px;background:#E4DCCF;margin:11px auto 0;flex-shrink:0`)}></div>
            <div style={css(`flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8px 30px 24px`)}>
              <div style={css(`width:56px;height:56px;border-radius:50%;background:var(--psoft,#F7E9EC);display:flex;align-items:center;justify-content:center;margin-bottom:16px`)}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--p,#7D1535)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
              </div>
              <div style={css(`font:700 18px var(--display,'Space Grotesk');color:#2A1B22;margin-bottom:7px`)}>Join the queue?</div>
              <div style={css(`font:500 13px 'Inter';color:#6F6A7D;line-height:1.5;max-width:250px;margin-bottom:24px`)}>You'll get a live token and a heads-up when it's almost your turn.</div>
              <div style={css(`display:flex;gap:10px;width:100%`)}>
                <button onClick={vals.closeQueueSheet} style={css(`flex:1;background:none;color:#6F6A7D;border:1.5px solid #E4DCCF;border-radius:var(--radM,14px);padding:15px 0;font:700 13px var(--display,'Space Grotesk');letter-spacing:.3px;cursor:pointer`)}>No</button>
                <button onClick={vals.confirmJoinQueue} style={css(`flex:2;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radM,14px);padding:15px 0;font:700 13.5px var(--display,'Space Grotesk');letter-spacing:.3px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px`)}>Confirm &amp; join <span>→</span></button>
              </div>
            </div>
          </div>
          
          <div style={css(`position:absolute;left:0;right:0;bottom:0;z-index:56;background:rgba(251,250,247,.97);backdrop-filter:blur(12px);border-top:1px solid #EFE9DF;padding:13px 18px 17px;display:flex;gap:10px`)}>
            <button onClick={vals.parkOrder} style={css(`flex:0 0 auto;background:none;color:var(--p,#7D1535);border:1.5px solid var(--p,#7D1535);border-radius:var(--radM,14px);padding:14px 18px;font:700 13px var(--display,'Space Grotesk');letter-spacing:.3px;cursor:pointer;display:flex;align-items:center;justify-content:center;white-space:nowrap`)}>Park order</button>
            <button onClick={vals.openQueueSheet} style={css(`flex:1;background:var(--p,#7D1535);color:#fff;border:none;border-radius:var(--radM,14px);padding:15px;font:700 13.5px var(--display,'Space Grotesk');letter-spacing:.3px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;box-shadow:0 8px 22px -10px rgba(125,21,53,.6)`)}>Join queue <span>→</span></button>
          </div>

          
          <div onClick={vals.closeParkSheet} style={css(`${vals.parkOverlayStyle}`)}></div>
          <div style={css(`${vals.parkSheetStyle}`)}>
            <div style={css(`width:40px;height:5px;border-radius:999px;background:#D8CFC2;margin:11px auto 3px;flex-shrink:0`)}></div>

            
            <div style={css(`display:flex;align-items:flex-start;gap:12px;padding:12px 20px 14px;flex-shrink:0`)}>
              <div style={css(`flex:1`)}>
                <div style={css(`display:flex;align-items:center;gap:8px;margin-bottom:5px`)}>
                  <span style={css(`width:8px;height:8px;border-radius:50%;background:var(--p,#8A1538);flex-shrink:0`)}></span>
                  <span style={css(`font:700 18px var(--display,'Space Grotesk');color:#2A1B22`)}>Park your order</span>
                </div>
                <div style={css(`font:500 12.5px 'Inter';color:#6F6A7D;line-height:1.5;max-width:270px`)}>Skip the wait — pick a pickup time and we'll start cooking so it's fresh when you arrive.</div>
              </div>
              <button onClick={vals.closeParkSheet} style={css(`flex-shrink:0;width:32px;height:32px;border-radius:50%;background:#fff;border:1px solid #EAE3D9;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#6F6A7D`)}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"></path></svg>
              </button>
            </div>

            
            { (vals.parkCartEmpty) ? ( <>
              <div style={css(`margin:0 20px 14px;flex-shrink:0;display:flex;align-items:center;gap:11px;background:#fff;border-radius:16px;padding:13px 14px;box-shadow:0 2px 10px -6px rgba(40,25,60,.18)`)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B9558A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={css(`color:var(--p,#8A1538);flex-shrink:0`)}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                <span style={css(`font:500 12.5px 'Inter';color:#6F6A7D`)}>Your cart is empty — add items from the menu first.</span>
              </div>
            </> ) : null}
            { (vals.parkHasCart) ? ( <>
              <div style={css(`flex-shrink:0;padding:0 20px 14px`)}>
                <div style={css(`font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1.3px;text-transform:uppercase;color:#A39BB0;margin-bottom:9px`)}>Your order</div>
                <div className="scr" style={css(`display:flex;flex-direction:column;gap:9px;max-height:156px;overflow-y:auto;-webkit-overflow-scrolling:touch;margin:0 -4px;padding:0 4px`)}>
                  { arr(vals.parkCartLines).map((line, _k38) => ( <Fragment key={_k38}>
                    <div style={css(`display:flex;align-items:center;gap:12px;background:#fff;border-radius:15px;padding:9px 11px;box-shadow:0 2px 10px -7px rgba(40,25,60,.2)`)}>
                      <div style={css(`width:42px;height:42px;border-radius:11px;flex-shrink:0;background:#EDE3D6 center/cover no-repeat;background-image:url(${line.img})`)}></div>
                      <div style={css(`flex:1;min-width:0`)}>
                        <div style={css(`font:700 12.5px 'Inter';color:#2A1B22;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:2px`)}>{line.name}</div>
                        <div style={css(`font:700 12px 'Inter';color:var(--p,#8A1538)`)}>{line.priceLabel}</div>
                      </div>
                      <div style={css(`flex-shrink:0;display:flex;align-items:center;gap:13px;background:#F3EEE8;border-radius:10px;padding:6px 12px`)}>
                        <button onClick={line.onRemove} style={css(`background:none;border:none;cursor:pointer;color:var(--p,#8A1538);font:700 17px 'Inter';line-height:1;padding:0`)}>−</button>
                        <span style={css(`font:700 13px 'Inter';color:#2A1B22;min-width:10px;text-align:center`)}>{line.qty}</span>
                        <button onClick={line.onAdd} style={css(`background:none;border:none;cursor:pointer;color:var(--p,#8A1538);font:700 17px 'Inter';line-height:1;padding:0`)}>+</button>
                      </div>
                    </div>
                  </Fragment> )) }
                </div>
              </div>
            </> ) : null}

            
            <div style={css(`margin:0 20px 14px;flex-shrink:0;display:flex;gap:4px;background:#EAE3D9;border-radius:13px;padding:4px`)}>
              { (vals.parkIsToday) ? ( <>
                <button onClick={vals.setParkToday} style={css(`flex:1;text-align:center;border:none;border-radius:11px;padding:9px;cursor:pointer;font:700 12px 'Inter';background:var(--p,#8A1538);color:#fff`)}>Today</button>
                <button onClick={vals.setParkTomorrow} style={css(`flex:1;text-align:center;border:none;border-radius:11px;padding:9px;cursor:pointer;font:700 12px 'Inter';background:transparent;color:#6F6A7D`)}>Tomorrow</button>
              </> ) : null}
              { (vals.parkIsTomorrow) ? ( <>
                <button onClick={vals.setParkToday} style={css(`flex:1;text-align:center;border:none;border-radius:11px;padding:9px;cursor:pointer;font:700 12px 'Inter';background:transparent;color:#6F6A7D`)}>Today</button>
                <button onClick={vals.setParkTomorrow} style={css(`flex:1;text-align:center;border:none;border-radius:11px;padding:9px;cursor:pointer;font:700 12px 'Inter';background:var(--p,#8A1538);color:#fff`)}>Tomorrow</button>
              </> ) : null}
            </div>

            
            <div className="scr" style={css(`flex:1;overflow-y:auto;overflow-x:hidden;padding:0 20px 4px`)}>
              <div style={css(`font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:1.3px;text-transform:uppercase;color:#A39BB0;margin-bottom:10px`)}>Pickup window</div>
              <div style={css(`display:grid;grid-template-columns:1fr 1fr;gap:9px`)}>
                { arr(vals.parkSlots).map((slot, _k39) => ( <Fragment key={_k39}>
                  { (slot.fSelected) ? ( <>
                    <button onClick={slot.onClick} style={css(`position:relative;text-align:left;border-radius:14px;padding:12px 13px 11px;cursor:pointer;background:var(--p,#8A1538);color:#fff;border:1.5px solid var(--p,#8A1538);box-shadow:0 6px 16px -8px rgba(138,21,56,.55)`)}>
                      <div style={css(`display:flex;align-items:center;gap:6px`)}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={css(`flex-shrink:0`)}><path d="M20 6 9 17l-5-5"></path></svg>
                        <span style={css(`font:700 12.5px 'Inter'`)}>{slot.label}</span>
                      </div>
                      { (slot.isLimited) ? ( <>
                        <div style={css(`font:600 10px 'Inter';color:rgba(255,255,255,.85);margin-top:3px`)}>Few left</div>
                      </> ) : null}
                    </button>
                  </> ) : null}
                  { (slot.fNormal) ? ( <>
                    <button onClick={slot.onClick} style={css(`position:relative;text-align:left;border-radius:14px;padding:12px 13px 11px;cursor:pointer;background:#fff;color:#2A1B22;border:1.5px solid #ECE6DB;box-shadow:0 2px 8px -5px rgba(40,25,60,.2)`)}>
                      <div style={css(`display:flex;align-items:center;gap:6px`)}>
                        <span style={css(`width:6px;height:6px;border-radius:50%;background:#9BAA5C;flex-shrink:0`)}></span>
                        <span style={css(`font:700 12.5px 'Inter'`)}>{slot.label}</span>
                      </div>
                      { (slot.isLimited) ? ( <>
                        <div style={css(`font:600 10px 'Inter';color:#B08900;margin-top:3px`)}>Few left</div>
                      </> ) : null}
                    </button>
                  </> ) : null}
                  { (slot.fFull) ? ( <>
                    <div style={css(`position:relative;text-align:left;border-radius:14px;padding:12px 13px 11px;background:#EDE7DF;color:#B4ADA2;border:1.5px solid transparent;opacity:.75;cursor:not-allowed`)}>
                      <div style={css(`display:flex;align-items:center;gap:6px`)}>
                        <span style={css(`width:6px;height:6px;border-radius:50%;background:#C8C0B4;flex-shrink:0`)}></span>
                        <span style={css(`font:700 12.5px 'Inter'`)}>{slot.label}</span>
                      </div>
                      <div style={css(`font:600 10px 'Inter';color:#B4ADA2;margin-top:3px`)}>Full</div>
                    </div>
                  </> ) : null}
                </Fragment> )) }
              </div>
              { (vals.parkHasSlot) ? ( <>
                <div style={css(`display:flex;align-items:center;gap:7px;margin:14px 2px 2px`)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6F6A7D" strokeWidth="2"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg>
                  <span style={css(`font:500 11.5px 'Inter';color:#6F6A7D`)}>{vals.leaveByText}</span>
                </div>
              </> ) : null}
            </div>

            
            <div style={css(`flex-shrink:0;background:rgba(243,238,232,.97);backdrop-filter:blur(10px);border-top:1px solid #E6DFD4;padding:13px 20px 18px`)}>
              { (vals.parkCanConfirm) ? ( <>
                <button onClick={vals.parkConfirm} style={css(`width:100%;color:#fff;border:none;border-radius:15px;padding:16px;font:700 13.5px var(--display,'Space Grotesk');letter-spacing:.3px;display:flex;align-items:center;justify-content:center;gap:8px;background:var(--p,#8A1538);cursor:pointer;box-shadow:0 8px 22px -10px rgba(138,21,56,.6)`)}>{vals.parkCtaLabel} <span>→</span></button>
              </> ) : null}
              { (vals.parkCantConfirm) ? ( <>
                <button onClick={vals.parkConfirm} style={css(`width:100%;color:#fff;border:none;border-radius:15px;padding:16px;font:700 13.5px var(--display,'Space Grotesk');letter-spacing:.3px;display:flex;align-items:center;justify-content:center;gap:8px;background:#D8C3CB;cursor:pointer;opacity:.95`)}>{vals.parkCtaLabel}</button>
              </> ) : null}
              <button onClick={vals.openQueueSheet} style={css(`width:100%;background:none;border:none;cursor:pointer;padding:12px 0 2px;font:600 12px 'Inter';color:#6F6A7D`)}>Join the live queue instead</button>
            </div>
          </div>
        </> ) : null}

        
        <div style={css(`position:absolute;bottom:8px;left:50%;transform:translateX(-50%);width:128px;height:5px;border-radius:999px;background:#1F1A2E;opacity:.28;z-index:70;pointer-events:none`)}></div>
      </div>
    </div>
  </main>
</div>

    </>
  )
}

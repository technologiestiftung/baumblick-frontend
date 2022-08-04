export const getGeolocation = (): Promise<GeolocationPosition['coords']> =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject('Geolocation is not supported by your browser')
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords)
        },
        () => {
          reject('Unable to retrieve your location')
        }
      )
    }
  })

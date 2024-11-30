export default function ndaAuth({ redirect, route }) {
    // Only run on client-side
    if (process.client) {
      const isNdaValidated = localStorage.getItem('ndaValidated') === 'true';
      const isNdaPage = route.path.startsWith('/nda/');
      const isValidationPage = route.path === '/nda' || route.path === '/nda/index';
  
      if (isNdaPage && !isValidationPage && !isNdaValidated) {
        return redirect('/nda');
      }
    }
  }
export type Environment = 'API' | 'BETA' | 'ALPHA';

export const ENVIRONMENT_COOKIE_NAME = 'environment';

export function setEnvironmentCookie(environment: Environment): void {
  // Set cookie for 1 year
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 1);
  
  document.cookie = `${ENVIRONMENT_COOKIE_NAME}=${environment}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
}

export function getEnvironmentCookie(): Environment {
  const cookies = document.cookie.split(';');
  const environmentCookie = cookies.find(cookie => 
    cookie.trim().startsWith(`${ENVIRONMENT_COOKIE_NAME}=`)
  );
  
  if (environmentCookie) {
    const value = environmentCookie.split('=')[1]?.trim();
    if (value === 'API' || value === 'BETA' || value === 'ALPHA') {
      return value as Environment;
    }
  }
  
  // Default to API if no valid cookie found
  return 'API';
}

export function removeEnvironmentCookie(): void {
  document.cookie = `${ENVIRONMENT_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function parseEnvironmentFromCookieHeader(cookieHeader: string | null): Environment {
  if (!cookieHeader) {
    return 'API';
  }
  
  const cookies = cookieHeader.split(';');
  const environmentCookie = cookies.find(cookie => 
    cookie.trim().startsWith(`${ENVIRONMENT_COOKIE_NAME}=`)
  );
  
  if (environmentCookie) {
    const value = environmentCookie.split('=')[1]?.trim();
    if (value === 'API' || value === 'BETA' || value === 'ALPHA') {
      return value as Environment;
    }
  }
  
  // Default to API if no valid cookie found
  return 'API';
}

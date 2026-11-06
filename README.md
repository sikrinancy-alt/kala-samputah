# khumari-art

## Fresh MongoDB Setup

1. Create a MongoDB Atlas database user and ensure the cluster's network access settings allow connections from the deployment.
2. In Vercel, set `MONGODB_URI` to the new cluster connection string for the Production environment (and Preview if needed). Percent-encode special characters in the database username or password, then redeploy.
3. Set a strong `JWT_SECRET` in Vercel and use the same `ADMIN_EMAIL` value for the admin account.
4. Update the ignored `.env.local` file with the new `MONGODB_URI` and the admin `ADMIN_EMAIL` / `ADMIN_PASSWORD`, then run the seed command from a trusted machine with Node.js 20.6 or newer:

```powershell
npm run seed:admin
```

The command loads `.env.local` automatically. The script only creates or updates the specified admin account. It does not delete or seed artwork. Add artworks from `/admin/artworks` after signing in. Do not put the database URI or admin password in client-side environment variables such as `NEXT_PUBLIC_*`.

If Vercel logs report `bad auth`, verify the Atlas database username/password and the URI's password encoding, update the Vercel `MONGODB_URI`, and redeploy. This error is raised by Atlas before the application can query or seed collections.

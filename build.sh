docker buildx build \
    --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_aW5zcGlyZWQtbGFkeWJ1Zy00Ni5jbGVyay5hY2NvdW50cy5kZXYk \
    --build-arg NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in \
    --build-arg NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/platform \
    --platform linux/amd64 \
    -t chengtze/watchdog-platform:0.3.0 .
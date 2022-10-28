import process from 'process';
import fs from 'fs';
import download from 'image-downloader';
import slugify from 'slugify';

//#region define consts
const outDir = `${process.cwd()}/${import.meta.env.OUT_DIR || 'dist'}`;
const cacheDir = `${process.cwd()}/${
  import.meta.env.CACHED_IMAGE_DIR || 'cached_images'
}`;
//#endregion

//#region create cache folder
if (!fs.existsSync(cacheDir)) {
  console.info('Creating a folder for cached images.');

  fs.mkdirSync(cacheDir);
}
//#endregion

export async function downloadRemoteImage(url: string, newImageName: string) {
  if (import.meta.env.DEV) {
    return url;
  }

  const cacheDest = `${cacheDir}/${newImageName}`;

  // #region check if image exists and identical.
  try {
    const oldImageSize = fs.statSync(cacheDest).size.toString();
    const newImageSize = (await fetch(url, { method: 'HEAD' })).headers.get(
      'content-length'
    );

    if (oldImageSize !== newImageSize) {
      console.log(`"${newImageName}" changed.`);
      throw Error();
    }

    console.log(`"${newImageName}" already cached.`);
    // #endregion
    // #region download and cache the new image.
  } catch (error) {
    console.log(`"${newImageName}" is downloading.`);

    await download.image({
      url,
      dest: cacheDest,
      headers: undefined,
      auth: undefined,
      agent: undefined,
      timeout: undefined,
      maxHeaderSize: undefined,
    });

    console.log(`"${newImageName}" cached.`);
  } finally {
    fs.copyFileSync(cacheDest, `${outDir}/${newImageName}`);

    console.log(`"${newImageName}" copied over.`);
  }
  // #endregion
}

export async function getDirectusImage(
  imageId: string,
  newImageName: string,
  imageTransformParams: { width: string; height: string }
) {
  const imgParams = new URLSearchParams({
    access_token: import.meta.env.DIRECTUS_TOKEN,
    format: 'webp',
    ...imageTransformParams,
  });

  const directusImgUrl = `${
    import.meta.env.DIRECTUS_URL
  }/assets/${imageId}?${imgParams.toString()}`;

  const filename = `${slugify(newImageName, { lower: true })}-${
    imageTransformParams.width
  }x${imageTransformParams.height}.${imgParams.get('format')}`;

  await downloadRemoteImage(directusImgUrl, filename);

  /**
   * Returns image name without prepending path.
   * Because images are served from the root folder.
   */
  return filename;
}

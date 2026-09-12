"""文件处理：页数统计。

本轮只覆盖 PDF 与图片。doc/docx 需要 LibreOffice 转换，留待下一轮——
接入时只需扩展本模块的 count_pages()，调用方（app.py）不用改。
"""
import logging

logger = logging.getLogger('print_service')

# 软依赖：没装 pypdf 时降级为「页数未知」，不影响下单主流程
try:
    from pypdf import PdfReader
except ImportError:  # pragma: no cover - 依赖缺失时的降级路径
    PdfReader = None
    logger.warning('未安装 pypdf，PDF 页数将无法统计：pip install -r requirements.txt')

# 图片恒为 1 页
IMAGE_EXTS = {'jpg', 'jpeg', 'png'}
PDF_EXTS = {'pdf'}


def count_pages(file_path, ext):
    """返回单份文档的页数；无法确定时返回 None（前端显示「页数待定」）。

    这里吞掉所有异常：数页数失败绝不能导致学生下单失败。
    """
    ext = (ext or '').lower().lstrip('.')

    if ext in IMAGE_EXTS:
        return 1
    if ext not in PDF_EXTS or PdfReader is None:
        return None  # doc/docx 等：需要 LibreOffice 转换，本轮不支持

    try:
        reader = PdfReader(file_path, strict=False)
        if reader.is_encrypted:
            # 空密码加密（教务系统、知网导出的 PDF 很常见）。
            # 解不开时下面读 pages 会抛异常，落到 except 里标成待定。
            reader.decrypt('')
        pages = len(reader.pages)
        return pages if pages > 0 else None  # 病态空文档归一成「待定」
    except Exception:
        logger.warning('PDF 页数解析失败，标记为待定: %s', file_path, exc_info=True)
        return None

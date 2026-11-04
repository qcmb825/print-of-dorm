/** 订单列表之间的差异判据：数据回响要不要动。
 *
 *  只看 id → status 的映射：新出现的单、消失的单都不算 ——
 *  翻页/筛选（订单台）和刚下的单（我的订单）都会让列表长度变化，
 *  为一次普通的列表刷新让整页装饰动一次，读到的会是"页面在抖"，
 *  而不是"有货进来了"。
 *
 *  这里只放判据本身。两个页面的轮询生命周期不一样（订单台带筛选/分页与
 *  行内忙碌记账，我的订单带隐藏已取件与站点信息），别顺手把取数也搬进来。
 */

/** 两张订单列表之间有没有**状态**变化。 */
export function statusChanged<T extends { id: number; status: string }>(
  before: readonly T[],
  after: readonly T[],
): boolean {
  if (!before.length || !after.length) return false
  const previous = new Map(before.map((order) => [order.id, order.status]))
  return after.some((order) => {
    const old = previous.get(order.id)
    return old !== undefined && old !== order.status
  })
}
